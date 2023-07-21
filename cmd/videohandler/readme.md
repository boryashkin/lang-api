# to download a vid

manually edit a source code of curltodownload.sh
### from a content root
mkdir media/<showname>
cd media/<showname>
../../cmd/videohandler/curltodownload.sh
### + manually download subtitles

# ts to mp4
../../cmd/videohandler/tstomp4.sh ./ 1000

# cur a source into phrases
### remove all ts files rm ./*.ts
### move mp4 and subtitles to a media/sources
### cd into content root

go run cmd/videohandler/main.go media/sources/<media>.mp4 media/sources/<subs>.vtt media/<showname>/

cp /tmp/dat2 ./import.json

# (optional) to fix some video
### fix timestamps in subtitles and run
go run cmd/videohandler/main.go media/source/<media>.mp4 media/sources/<subs>.vtt media/<showname>/ 462 463 # retry 462

### and either rename the file to it's previous name or edit the name in import.json


# upload all the files to the s3

cd media/<show>
aws s3 sync . s3://langapi.borisd.ru/media/<show>/ --endpoint <s3 endpoint>

# import import.json to the database

### start a tunnel to a mongo and then use robo3t
ssh -L 27019:<master pod ip>:27017 -Nf <kuber host>
### or you can use mongo inside k8s
#kubectl exec -it <mongopod> --- sh
#> mongosh mongodb://<user>:<pass>@common-mongo-db-psmdb-rs0.default.svc.cluster.local:27017/#language-api?authSource=admin
### or mongoimport
mongoimport --uri "mongodb://credentials@SHARD_ADDR.default.svc.cluster.local/language-api?authSource=admin" --collection sources --type json ./some_sources.json --legacy --jsonArray


### !create a source (db.sources.insert({...}))
#and copy its $SOURCE_ID

### !!! manually rename sourceID in import.json (from 648ef1e65a4ab6473e5b28e5 to the $SOURCE_ID)

# upload import.json to db.media collection
