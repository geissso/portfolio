import { useState } from "react";

import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import web1 from "@/assets/web-1.jpg";
import web2 from "@/assets/web-2.jpg";
import social1 from "@/assets/social-1.jpg";
import drawing1 from "@/assets/drawing-1.jpg";
import drawing2 from "@/assets/drawing-2.jpg";

type Category = "all" | "photographies" | "affiches" | "sites-web" | "reseaux-sociaux" | "dessins";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "photographies", label: "Photographies" },
  { key: "affiches", label: "Affiches" },
  { key: "sites-web", label: "Sites Web" },
  { key: "reseaux-sociaux", label: "Réseaux Sociaux" },
  { key: "dessins", label: "Dessins" },
];

const projects = [
  { id: 1, title: "Lumière Urbaine", category: "photographies" as Category, image: photo1, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, title: "Portrait Doré", category: "photographies" as Category, image: photo2, description: "Sed do eiusmod tempor incididunt ut labore." },
  { id: 3, title: "Festival Typographique", category: "affiches" as Category, image: poster1, description: "Ut enim ad minim veniam, quis nostrud exercitation." },
  { id: 4, title: "Événement Moderniste", category: "affiches" as Category, image: poster2, description: "Duis aute irure dolor in reprehenderit." },
  { id: 5, title: "E-commerce Redesign", category: "sites-web" as Category, image: web1, description: "Excepteur sint occaecat cupidatat non proident." },
  { id: 6, title: "Brand Platform", category: "sites-web" as Category, image: web2, description: "Sunt in culpa qui officia deserunt mollit." },
  { id: 7, title: "Campagne Gradient", category: "reseaux-sociaux" as Category, image: social1, description: "Nemo enim ipsam voluptatem quia voluptas sit." },
  { id: 8, title: "Étude Botanique", category: "dessins" as Category, image: drawing1, description: "Neque porro quisquam est qui dolorem ipsum." },
  { id: 9, title: "Croquis Félin", category: "dessins" as Category, image: drawing2, description: "Quis autem vel eum iure reprehenderit." },
];

const PortfolioGrid = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 text-xs font-body uppercase tracking-widest border transition-all duration-300 ${
              activeCategory === cat.key
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className="break-inside-avoid group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="overflow-hidden bg-card">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="pt-3 pb-1">
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-xl text-foreground">{project.title}</h3>
                <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  {categories.find((c) => c.key === project.category)?.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-body">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
