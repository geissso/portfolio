/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1283400740")

  // update collection data
  unmarshal({
    "name": "identites_visuelles"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1283400740")

  // update collection data
  unmarshal({
    "name": "Identites_visuels"
  }, collection)

  return app.save(collection)
})
