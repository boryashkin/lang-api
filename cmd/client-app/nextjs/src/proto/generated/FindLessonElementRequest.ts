// Original file: ../mediatext.proto

import type { Pagination as _Pagination, Pagination__Output as _Pagination__Output } from './Pagination';

export interface FindLessonElementRequest {
  'lessonId'?: (string);
  'pagination'?: (_Pagination | null);
}

export interface FindLessonElementRequest__Output {
  'lessonId': (string);
  'pagination': (_Pagination__Output | null);
}
