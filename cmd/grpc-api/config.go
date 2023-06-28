package main

type Environment struct {
	MongoDBUri     string `env:"MONGODB_URI"`
	GrpcHost       string `env:"GRPC_HOST"`
	GrpcPort       int32  `env:"GRPC_PORT"`
	MediaPrefixCdn string `env:"MEDIA_PREFIX_CDN"`
}
