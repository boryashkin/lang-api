// Original file: ../mediatext.proto

import type { ElementRule as _ElementRule, ElementRule__Output as _ElementRule__Output } from './ElementRule';

export interface StoreLessonElementRequest {
  'id'?: (string);
  'lessonId'?: (string);
  'name'?: (string);
  'slug'?: (string);
  'mediaId'?: (string);
  'rules'?: (_ElementRule)[];
  'order'?: (number);
}

export interface StoreLessonElementRequest__Output {
  'id': (string);
  'lessonId': (string);
  'name': (string);
  'slug': (string);
  'mediaId': (string);
  'rules': (_ElementRule__Output)[];
  'order': (number);
}
