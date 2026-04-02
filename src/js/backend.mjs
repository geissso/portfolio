import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.PUBLIC_POCKETBASE_URL || "http://pbportfolio.geiss-solene.fr/";
const db = new PocketBase(POCKETBASE_URL);

const CATEGORIES = [
	{ key: "all", label: "Tout" },
	{ key: "photos", label: "Photographies" },
	{ key: "affiches", label: "Affiches" },
	{ key: "sites", label: "Sites Web" },
	{ key: "dessins", label: "Dessins" },
	{ key: "identites_visuelles", label: "Identites visuelles" },
	{ key: "maquettes", label: "Maquettes" }
];

const COLLECTION_CONFIG = {
	affiches: { label: "Affiches", imageFields: ["img", "hero"] },
	photos: { label: "Photographies", imageFields: ["hero", "img"] },
	dessins: { label: "Dessins", imageFields: ["hero", "img"] },
	sites: { label: "Sites Web", imageFields: ["img", "hero"] },
	identites_visuelles: {
		label: "Identites visuelles",
		imageFields: ["img", "hero"]
	},
	maquettes: { label: "Maquettes", imageFields: ["img", "hero"] }
};

const COLLECTION_CANDIDATES = {
	affiches: ["affiches"],
	photos: ["photos"],
	dessins: ["dessins"],
	sites: ["sites"],
	identites_visuelles: ["identites_visuelles", "identites_visuels", "Identites_visuels"],
	maquettes: ["maquettes", "maquette"]
};

function getImageUrl(record, filename, collection) {
	if (!filename) return "";
	return db.files.getUrl(record, filename, { thumb: "0x300" });
}

function getGalleryUrls(record, collection) {
	if (!Array.isArray(record.galerie) || record.galerie.length === 0) {
		return [];
	}
	return record.galerie.map((filename) => 
		db.files.getUrl(record, filename, { thumb: "0x500" })
	);
}

function getSkillsUrls(record) {
	if (!Array.isArray(record.skills) || record.skills.length === 0) {
		return [];
	}

	return record.skills
		.filter((filename) => typeof filename === "string" && filename.trim())
		.map((filename) => db.files.getUrl(record, filename));
}

function firstNonEmptyString(values) {
	for (const value of values) {
		if (typeof value === "string" && value.trim()) {
			return value.trim();
		}
	}
	return "";
}

function pickImage(record, categoryKey) {
	const imageFields = COLLECTION_CONFIG[categoryKey]?.imageFields ?? [];

	for (const field of imageFields) {
		const fileName = record[field];
		if (typeof fileName === "string" && fileName.trim()) {
			return getImageUrl(record, fileName, categoryKey);
		}
	}

	if (Array.isArray(record.galerie) && record.galerie.length > 0) {
		return getImageUrl(record, record.galerie[0], categoryKey);
	}

	return "";
}

function normalizeRecord(record, categoryKey) {
	const titleFields = {
		identites_visuelles: [record.nom_da, record.nom, record.title, record.name],
		maquettes: [record.nom_maquette, record.nom, record.title, record.name]
	};

	const createdValue = firstNonEmptyString([record.date_creation, record.created]);
	const preferredTitleFields = titleFields[categoryKey] ?? [record.nom, record.title, record.name];

	return {
		id: `${categoryKey}-${record.id}`,
		pocketbaseId: record.id,
		title: firstNonEmptyString(preferredTitleFields) || "Sans titre",
		description: firstNonEmptyString([record.description]) || "Aucune description.",
		category: categoryKey,
		categoryLabel: COLLECTION_CONFIG[categoryKey]?.label || categoryKey,
		type: record.type_projet || record.type || "Projet",
		image: pickImage(record, categoryKey),
		gallery: getGalleryUrls(record, categoryKey),
		skills: getSkillsUrls(record),
		created: createdValue || "",
		siteUrl: record.url || record.site_url || record.lien || ""
	};
}

function getCollectionCandidates(categoryKey) {
	return COLLECTION_CANDIDATES[categoryKey] ?? [categoryKey];
}

async function fetchFirstAvailableCollection(categoryKey) {
	const candidates = getCollectionCandidates(categoryKey);
	const recordsMap = new Map();
	const sources = [];
	let firstError = null;

	for (const collectionName of candidates) {
		try {
			const records = await db.collection(collectionName).getFullList({
				sort: "-date_creation,-created",
				requestKey: null
			});

			sources.push(collectionName);

			for (const record of records) {
				if (!recordsMap.has(record.id)) {
					recordsMap.set(record.id, record);
				}
			}
		} catch (error) {
			if (!firstError) {
				firstError = error;
			}
		}
	}

	if (sources.length > 0) {
		const records = Array.from(recordsMap.values()).sort((a, b) => {
			const dateA = firstNonEmptyString([a.created, a.date_creation]);
			const dateB = firstNonEmptyString([b.created, b.date_creation]);
			return dateA < dateB ? 1 : -1;
		});

		return {
			records,
			collectionName: sources.join(", ")
		};
	}

	throw firstError ?? new Error(`No matching collection found for ${categoryKey}`);
}

export async function getPortfolioData() {
	const categoriesToFetch = [
		"affiches",
		"photos",
		"dessins",
		"sites",
		"identites_visuelles",
		"maquettes"
	];

	const results = await Promise.allSettled(
		categoriesToFetch.map((categoryKey) =>
			fetchFirstAvailableCollection(categoryKey)
		)
	);

	const projects = [];
	const availableCategories = new Set(["all"]);

	results.forEach((result, index) => {
		const categoryKey = categoriesToFetch[index];

		if (result.status === "fulfilled" && result.value.records.length > 0) {
			console.log(`✓ ${categoryKey} (${result.value.collectionName}): ${result.value.records.length} items`);
			const normalized = result.value.records.map((record) =>
				normalizeRecord(record, categoryKey)
			);
			projects.push(...normalized);
			availableCategories.add(categoryKey);
		} else if (result.status === "rejected") {
			console.warn(`✗ ${categoryKey}: ${result.reason?.message || result.reason}`);
		}
	});

	console.log(`Total projects: ${projects.length}`);
	console.log(`PocketBase URL: ${POCKETBASE_URL}`);

	projects.sort((a, b) => (a.created < b.created ? 1 : -1));

	const categories = CATEGORIES.filter((category) =>
		availableCategories.has(category.key)
	);

	return {
		categories,
		projects,
		pocketbaseUrl: POCKETBASE_URL
	};
}

export async function getProjectById(projectId) {
	const [categoryKey, recordId] = projectId.split("-", 2);

	if (!categoryKey || !recordId) {
		throw new Error(`Invalid project ID format: ${projectId}`);
	}

	try {
		const candidates = getCollectionCandidates(categoryKey);

		for (const collectionName of candidates) {
			try {
				const record = await db.collection(collectionName).getOne(recordId, {
					requestKey: null
				});
				return normalizeRecord(record, categoryKey);
			} catch (innerError) {
				if (innerError?.status !== 404) {
					throw innerError;
				}
			}
		}

		throw new Error(`Project not found: ${projectId}`);
	} catch (error) {
		if (error.status === 404) {
			throw new Error(`Project not found: ${projectId}`);
		}
		throw new Error(`Failed to fetch project: ${error.message}`);
	}
}

export async function getAllProjects() {
	const { projects } = await getPortfolioData();
	return projects;
}

export function getPocketBaseInstance() {
	return db;
}
