// Original file: ../mediatext.proto

import type { Pagination as _Pagination, Pagination__Output as _Pagination__Output } from './Pagination';

export interface FindLessonsRequest {
  'id'?: (string);
  'slug'?: (string);
  'pagination'?: (_Pagination | null);
}

export interface FindLessonsRequest__Output {
  'id': (string);
  'slug': (string);
  'pagination': (_Pagination__Output | null);
}
