// Original file: ../mediatext.proto

import type { Pagination as _Pagination, Pagination__Output as _Pagination__Output } from './Pagination';

export interface FindMediaRequest {
  'id'?: (string);
  'text'?: (string);
  'type'?: (string);
  'pagination'?: (_Pagination | null);
}

export interface FindMediaRequest__Output {
  'id': (string);
  'text': (string);
  'type': (string);
  'pagination': (_Pagination__Output | null);
}
