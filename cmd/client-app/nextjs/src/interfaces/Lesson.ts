import Text from "./Text";

export default interface Lesson {
  slug: string;
  name: string;
  description: string;
  language: string;
  texts: Text[];
}
