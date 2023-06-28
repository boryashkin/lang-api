// Original file: ../mediatext.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from './google/protobuf/Timestamp';

export interface CreateLessonReply {
  'id'?: (string);
  'name'?: (string);
  'slug'?: (string);
  'ownerId'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'description'?: (string);
}

export interface CreateLessonReply__Output {
  'id': (string);
  'name': (string);
  'slug': (string);
  'ownerId': (string);
  'createdAt': (_google_protobuf_Timestamp__Output | null);
  'description': (string);
}
