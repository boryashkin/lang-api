// Original file: ../mediatext.grpc

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from './google/protobuf/Timestamp';

export interface Media {
  'id'?: (string);
  'sourceId'?: (string);
  'sequence'?: (number);
  'originalLang'?: (string);
  'text'?: (string);
  'type'?: (string);
  'uri'?: (string);
  'uriThumbnail'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
}

export interface Media__Output {
  'id': (string);
  'sourceId': (string);
  'sequence': (number);
  'originalLang': (string);
  'text': (string);
  'type': (string);
  'uri': (string);
  'uriThumbnail': (string);
  'createdAt': (_google_protobuf_Timestamp__Output | null);
}
