import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MediaServiceClient as _MediaServiceClient, MediaServiceDefinition as _MediaServiceDefinition } from './MediaService';
import { LessonServiceClient, LessonServiceDefinition } from './LessonService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  FindMediaReply: MessageTypeDefinition
  FindMediaRequest: MessageTypeDefinition
  Media: MessageTypeDefinition
  MediaService: SubtypeConstructor<typeof grpc.Client, _MediaServiceClient> & { service: _MediaServiceDefinition }
  LessonService: SubtypeConstructor<typeof grpc.Client, LessonServiceClient> & { service: LessonServiceDefinition }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
}

