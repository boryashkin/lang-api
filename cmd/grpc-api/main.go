package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"time"

	"runtime/debug"

	env "github.com/Netflix/go-env"
	tgrpc "github.com/boryashkin/language-api/internal/mediatext/grpc"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/exp/slog"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	opts := slog.HandlerOptions{
		Level: slog.LevelDebug,
	}
	handler := slog.NewJSONHandler(os.Stdout, &opts)
	buildInfo, _ := debug.ReadBuildInfo()
	logger := slog.New(handler).With(
		slog.Group("program_info",
			slog.Int("pid", os.Getpid()),
			slog.String("go_version", buildInfo.GoVersion),
		),
	)
	var config Environment
	_, err := env.UnmarshalFromEnviron(&config)
	if err != nil {
		logger.Error("error reading env", slog.Any("err", err))
		panic(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(config.MongoDBUri))
	if err != nil {
		logger.Error("error connecting mongo", slog.Any("err", err))
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			logger.Error("error disconnecting mongo", slog.Any("err", err))
			panic(err)
		}
	}()

	textServer := tgrpc.MyMediaTextServiceServer{}
	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", config.GrpcPort))
	if err != nil {
		logger.Error("failed to listen", slog.Any("err", err))
	}

	grpcServer := grpc.NewServer()
	tgrpc.RegisterMediaTextServiceServer(grpcServer, &textServer)
	reflection.Register(grpcServer)
	err = grpcServer.Serve(lis)
	if err != nil {
		logger.Error("error serving textServer", slog.Any("err", err))
	}
}