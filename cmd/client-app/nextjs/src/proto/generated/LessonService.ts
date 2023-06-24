// Original file: ../mediatext.grpc

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateLessonReply as _CreateLessonReply, CreateLessonReply__Output as _CreateLessonReply__Output } from './CreateLessonReply';
import type { CreateLessonRequest as _CreateLessonRequest, CreateLessonRequest__Output as _CreateLessonRequest__Output } from './CreateLessonRequest';

export interface LessonServiceClient extends grpc.Client {
  CreateLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  CreateLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  CreateLesson(argument: _CreateLessonRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  CreateLesson(argument: _CreateLessonRequest, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  
}

export interface LessonServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateLesson: grpc.handleUnaryCall<_CreateLessonRequest__Output, _CreateLessonReply>;
  
}

export interface LessonServiceDefinition extends grpc.ServiceDefinition {
  CreateLesson: MethodDefinition<_CreateLessonRequest, _CreateLessonReply, _CreateLessonRequest__Output, _CreateLessonReply__Output>
}
