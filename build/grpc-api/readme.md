docker build . -f build/grpc-api/Dockerfile -t docker ghcr.io/boryashkin/lang-api-grpc-api:<ver!>

# or without -t
docker tag <image> ghcr.io/boryashkin/lang-api-grpc-api:<ver!>
docker tag <image> ghcr.io/boryashkin/lang-api-grpc-api:latest

docker push ghcr.io/boryashkin/lang-api-grpc-api:<ver!>