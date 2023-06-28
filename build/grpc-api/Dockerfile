FROM golang:1.20 as build

WORKDIR /go/src/app
COPY . .

RUN go mod download
#RUN go vet -v /go/src/app/cmd/grpc-api

WORKDIR /go/src/app/cmd/grpc-api
RUN CGO_ENABLED=0 go build -o /go/bin/app

# Now copy it into our base image.
FROM gcr.io/distroless/static-debian11
LABEL org.opencontainers.image.source=https://github.com/boryashkin/lang-api

COPY --from=build /go/bin/app /
CMD ["/app"]