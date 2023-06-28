// Original file: ../mediatext.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateMediaReply as _CreateMediaReply, CreateMediaReply__Output as _CreateMediaReply__Output } from './CreateMediaReply';
import type { CreateMediaRequest as _CreateMediaRequest, CreateMediaRequest__Output as _CreateMediaRequest__Output } from './CreateMediaRequest';
import type { FindMediaReply as _FindMediaReply, FindMediaReply__Output as _FindMediaReply__Output } from './FindMediaReply';
import type { FindMediaRequest as _FindMediaRequest, FindMediaRequest__Output as _FindMediaRequest__Output } from './FindMediaRequest';

export interface MediaServiceClient extends grpc.Client {
  CreateMedia(argument: _CreateMediaRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  CreateMedia(argument: _CreateMediaRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  CreateMedia(argument: _CreateMediaRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  CreateMedia(argument: _CreateMediaRequest, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  createMedia(argument: _CreateMediaRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  createMedia(argument: _CreateMediaRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  createMedia(argument: _CreateMediaRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  createMedia(argument: _CreateMediaRequest, callback: grpc.requestCallback<_CreateMediaReply__Output>): grpc.ClientUnaryCall;
  
  FindMedia(argument: _FindMediaRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  FindMedia(argument: _FindMediaRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  FindMedia(argument: _FindMediaRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  FindMedia(argument: _FindMediaRequest, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  findMedia(argument: _FindMediaRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  findMedia(argument: _FindMediaRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  findMedia(argument: _FindMediaRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  findMedia(argument: _FindMediaRequest, callback: grpc.requestCallback<_FindMediaReply__Output>): grpc.ClientUnaryCall;
  
}

export interface MediaServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateMedia: grpc.handleUnaryCall<_CreateMediaRequest__Output, _CreateMediaReply>;
  
  FindMedia: grpc.handleUnaryCall<_FindMediaRequest__Output, _FindMediaReply>;
  
}

export interface MediaServiceDefinition extends grpc.ServiceDefinition {
  CreateMedia: MethodDefinition<_CreateMediaRequest, _CreateMediaReply, _CreateMediaRequest__Output, _CreateMediaReply__Output>
  FindMedia: MethodDefinition<_FindMediaRequest, _FindMediaReply, _FindMediaRequest__Output, _FindMediaReply__Output>
}
