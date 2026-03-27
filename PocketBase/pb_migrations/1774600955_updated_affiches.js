/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_622189280")

  // remove field
  collection.fields.removeById("url15430798")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_622189280")

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url15430798",
    "name": "site_url",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
})
