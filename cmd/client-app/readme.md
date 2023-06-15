# How it was created

cd cmd/client-app
docker run -v "$PWD":/usr/src/app -w /usr/src/app -ti node:20-alpine3.16 sh
>npx create-next-app@latest
#created the project with "client-app" name, then renamed the folder to nextjs

# run dev

cd nextjs
docker run -v "$PWD":/usr/src/app -w /usr/src/app -ti -p 3000:3000 node:20-alpine3.16 npm run dev

# Build
cd nextjs

docker build . -f ../../../build/client-app/Dockerfile
## for prod add: --build-arg ASSET_PREFIX_CDN=https://langapi.akamaized.net/

# tag
docker image ls
docker tag some_image_id ghcr.io/boryashkin/lang-api:latest