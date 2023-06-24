import { MouseEventHandler } from "react";
import { TextLesson } from "./TextLesson";
import { VideoLesson } from "./VideoLesson";
import Text, { TextType } from "@/interfaces/Text";

export function Lesson(props: { text: Text; handleSpanClick: MouseEventHandler<Element> | undefined }) {
  if (props.text.type == TextType.Video) {
      return <VideoLesson {...props} />
  }

  return <TextLesson {...props} />
}