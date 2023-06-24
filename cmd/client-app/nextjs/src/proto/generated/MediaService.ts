// Original file: ../mediatext.grpc

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { FindMediaReply as _FindMediaReply, FindMediaReply__Output as _FindMediaReply__Output } from './FindMediaReply';
import type { FindMediaRequest as _FindMediaRequest, FindMediaRequest__Output as _FindMediaRequest__Output } from './FindMediaRequest';

export interface MediaServiceClient extends grpc.Client {
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
  FindMedia: grpc.handleUnaryCall<_FindMediaRequest__Output, _FindMediaReply>;
  
}

export interface MediaServiceDefinition extends grpc.ServiceDefinition {
  FindMedia: MethodDefinition<_FindMediaRequest, _FindMediaReply, _FindMediaRequest__Output, _FindMediaReply__Output>
}
