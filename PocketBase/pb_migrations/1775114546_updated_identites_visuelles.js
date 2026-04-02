/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1283400740")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "file3576764016",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "skills",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1283400740")

  // remove field
  collection.fields.removeById("file3576764016")

  return app.save(collection)
})
