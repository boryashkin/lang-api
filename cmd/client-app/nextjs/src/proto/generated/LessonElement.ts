// Original file: ../mediatext.proto

import type { ElementRule as _ElementRule, ElementRule__Output as _ElementRule__Output } from './ElementRule';
import type { Media as _Media, Media__Output as _Media__Output } from './Media';

export interface LessonElement {
  'id'?: (string);
  'lessonId'?: (string);
  'name'?: (string);
  'slug'?: (string);
  'mediaId'?: (string);
  'rules'?: (_ElementRule)[];
  'order'?: (number);
  'media'?: (_Media | null);
}

export interface LessonElement__Output {
  'id': (string);
  'lessonId': (string);
  'name': (string);
  'slug': (string);
  'mediaId': (string);
  'rules': (_ElementRule__Output)[];
  'order': (number);
  'media': (_Media__Output | null);
}
