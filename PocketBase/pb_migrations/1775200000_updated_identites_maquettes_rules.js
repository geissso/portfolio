/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const identitesCollection = app.findCollectionByNameOrId("pbc_1283400740")
  const maquettesCollection = app.findCollectionByNameOrId("pbc_357483283")

  identitesCollection.listRule = ""
  identitesCollection.viewRule = ""

  maquettesCollection.listRule = ""
  maquettesCollection.viewRule = ""

  app.save(identitesCollection)
  return app.save(maquettesCollection)
}, (app) => {
  const identitesCollection = app.findCollectionByNameOrId("pbc_1283400740")
  const maquettesCollection = app.findCollectionByNameOrId("pbc_357483283")

  identitesCollection.listRule = null
  identitesCollection.viewRule = null

  maquettesCollection.listRule = null
  maquettesCollection.viewRule = null

  app.save(identitesCollection)
  return app.save(maquettesCollection)
})