import Text from "./Text";

export default interface Lesson {
  slug: string;
  name: string;
  language: string;
  texts: Text[];
}
