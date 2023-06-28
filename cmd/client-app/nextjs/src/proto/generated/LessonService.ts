// Original file: ../mediatext.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateLessonReply as _CreateLessonReply, CreateLessonReply__Output as _CreateLessonReply__Output } from './CreateLessonReply';
import type { CreateLessonRequest as _CreateLessonRequest, CreateLessonRequest__Output as _CreateLessonRequest__Output } from './CreateLessonRequest';
import type { FindElementsReply as _FindElementsReply, FindElementsReply__Output as _FindElementsReply__Output } from './FindElementsReply';
import type { FindLessonElementRequest as _FindLessonElementRequest, FindLessonElementRequest__Output as _FindLessonElementRequest__Output } from './FindLessonElementRequest';
import type { FindLessonsReply as _FindLessonsReply, FindLessonsReply__Output as _FindLessonsReply__Output } from './FindLessonsReply';
import type { FindLessonsRequest as _FindLessonsRequest, FindLessonsRequest__Output as _FindLessonsRequest__Output } from './FindLessonsRequest';
import type { StoreLessonElementReply as _StoreLessonElementReply, StoreLessonElementReply__Output as _StoreLessonElementReply__Output } from './StoreLessonElementReply';
import type { StoreLessonElementRequest as _StoreLessonElementRequest, StoreLessonElementRequest__Output as _StoreLessonElementRequest__Output } from './StoreLessonElementRequest';

export interface LessonServiceClient extends grpc.Client {
  CreateLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  CreateLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  CreateLesson(argument: _CreateLessonRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  CreateLesson(argument: _CreateLessonRequest, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  createLesson(argument: _CreateLessonRequest, callback: grpc.requestCallback<_CreateLessonReply__Output>): grpc.ClientUnaryCall;
  
  FindElements(argument: _FindLessonElementRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  FindElements(argument: _FindLessonElementRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  FindElements(argument: _FindLessonElementRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  FindElements(argument: _FindLessonElementRequest, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  findElements(argument: _FindLessonElementRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  findElements(argument: _FindLessonElementRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  findElements(argument: _FindLessonElementRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  findElements(argument: _FindLessonElementRequest, callback: grpc.requestCallback<_FindElementsReply__Output>): grpc.ClientUnaryCall;
  
  FindLessons(argument: _FindLessonsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  FindLessons(argument: _FindLessonsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  FindLessons(argument: _FindLessonsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  FindLessons(argument: _FindLessonsRequest, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  findLessons(argument: _FindLessonsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  findLessons(argument: _FindLessonsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  findLessons(argument: _FindLessonsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  findLessons(argument: _FindLessonsRequest, callback: grpc.requestCallback<_FindLessonsReply__Output>): grpc.ClientUnaryCall;
  
  StoreElement(argument: _StoreLessonElementRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  StoreElement(argument: _StoreLessonElementRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  StoreElement(argument: _StoreLessonElementRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  StoreElement(argument: _StoreLessonElementRequest, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  storeElement(argument: _StoreLessonElementRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  storeElement(argument: _StoreLessonElementRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  storeElement(argument: _StoreLessonElementRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  storeElement(argument: _StoreLessonElementRequest, callback: grpc.requestCallback<_StoreLessonElementReply__Output>): grpc.ClientUnaryCall;
  
}

export interface LessonServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateLesson: grpc.handleUnaryCall<_CreateLessonRequest__Output, _CreateLessonReply>;
  
  FindElements: grpc.handleUnaryCall<_FindLessonElementRequest__Output, _FindElementsReply>;
  
  FindLessons: grpc.handleUnaryCall<_FindLessonsRequest__Output, _FindLessonsReply>;
  
  StoreElement: grpc.handleUnaryCall<_StoreLessonElementRequest__Output, _StoreLessonElementReply>;
  
}

export interface LessonServiceDefinition extends grpc.ServiceDefinition {
  CreateLesson: MethodDefinition<_CreateLessonRequest, _CreateLessonReply, _CreateLessonRequest__Output, _CreateLessonReply__Output>
  FindElements: MethodDefinition<_FindLessonElementRequest, _FindElementsReply, _FindLessonElementRequest__Output, _FindElementsReply__Output>
  FindLessons: MethodDefinition<_FindLessonsRequest, _FindLessonsReply, _FindLessonsRequest__Output, _FindLessonsReply__Output>
  StoreElement: MethodDefinition<_StoreLessonElementRequest, _StoreLessonElementReply, _StoreLessonElementRequest__Output, _StoreLessonElementReply__Output>
}
