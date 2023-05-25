package main

type Environment struct {
	MongoDBUri string `env:"MONGODB_URI"`
	GrpcPort   int32  `env:"GRPC_PORT"`
}
