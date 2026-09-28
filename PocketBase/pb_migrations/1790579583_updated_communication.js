/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_278628506")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select1721835527",
    "maxSelect": 1,
    "name": "type_com",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "projet scolaire",
      "projet perso"
    ]
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file3150104748",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "img",
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
  collection.fields.removeById("select1721835527")

  // remove field
  collection.fields.removeById("file3150104748")

  return app.save(collection)
})
