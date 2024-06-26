import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { LessonServiceClient as _LessonServiceClient, LessonServiceDefinition as _LessonServiceDefinition } from './LessonService';
import type { MediaServiceClient as _MediaServiceClient, MediaServiceDefinition as _MediaServiceDefinition } from './MediaService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  CreateLessonReply: MessageTypeDefinition
  CreateLessonRequest: MessageTypeDefinition
  CreateMediaReply: MessageTypeDefinition
  CreateMediaRequest: MessageTypeDefinition
  ElementRule: MessageTypeDefinition
  FindElementsReply: MessageTypeDefinition
  FindLessonElementRequest: MessageTypeDefinition
  FindLessonsReply: MessageTypeDefinition
  FindLessonsRequest: MessageTypeDefinition
  FindMediaReply: MessageTypeDefinition
  FindMediaRequest: MessageTypeDefinition
  Lesson: MessageTypeDefinition
  LessonElement: MessageTypeDefinition
  LessonService: SubtypeConstructor<typeof grpc.Client, _LessonServiceClient> & { service: _LessonServiceDefinition }
  Media: MessageTypeDefinition
  MediaService: SubtypeConstructor<typeof grpc.Client, _MediaServiceClient> & { service: _MediaServiceDefinition }
  Pagination: MessageTypeDefinition
  StoreLessonElementReply: MessageTypeDefinition
  StoreLessonElementRequest: MessageTypeDefinition
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
}

