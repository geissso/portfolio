/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_278628506")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file2658997648",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "galerie",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_278628506")

  // remove field
  collection.fields.removeById("file2658997648")

  return app.save(collection)
})
