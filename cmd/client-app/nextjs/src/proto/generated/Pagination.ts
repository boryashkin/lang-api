// Original file: ../mediatext.proto

import type { Long } from '@grpc/proto-loader';

export interface Pagination {
  'limit'?: (number | string | Long);
  'offset'?: (number | string | Long);
}

export interface Pagination__Output {
  'limit': (string);
  'offset': (string);
}
