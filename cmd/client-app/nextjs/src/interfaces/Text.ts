import TextRule from "./TextRule";

export default interface Text{
    id: string;
    posterUri: string;
    mediaUri: string;
    title: string;
    text: string;
    rules: TextRule[];
    type: TextType;
}

  export enum TextType {
    Text = "text",
    Form = "form",
    Video = "video",
  }

  /*
  {
    poster: "/tbbt_1.jpeg",
    uri: "/tbbt_5.mp4",
    text: " I'm afraid you couldn't be more wrong"
  }
  */