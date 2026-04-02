/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_357483283")

  // add field
  collection.fields.addAt(5, new Field({
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

  // update field
  collection.fields.addAt(4, new Field({
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
  const collection = app.findCollectionByNameOrId("pbc_357483283")

  // remove field
  collection.fields.removeById("file3576764016")

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file2658997648",
    "maxSelect": 1,
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
})
