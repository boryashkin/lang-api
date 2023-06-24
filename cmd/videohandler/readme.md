
## to import documents directly to mongo
mongoimport --uri "mongodb://credentials@SHARD_ADDR.default.svc.cluster.local/language-api?authSource=admin" --collection sources --type json ./some_sources.json --legacy --jsonArray