
import LessonHolder from '@/components/lesson/LessonHolder';
import Text, { TextType } from '@/interfaces/Text';

// const videos: Text[] = [
//   {
//     id: "rules",
//     posterUri: "",
//     videoUri: "",
//     title: "Правила будут выделены цветами",
//     text: "Нажимайте на цветной текст, чтобы увидеть их описания.",
//     rules: [
//       { text: "Правила будут выделены ", ruleDescription: "", ruleName: "", color: "" },
//       { text: "цветами", ruleDescription: "Вот так", ruleName: "Описание", color: "red" },
//     ],
//     type: TextType.Text,
//   },
//   {
//     id: "first-simple-example",
//     posterUri: "/tbbt_1.jpeg",
//     videoUri: "/tbbt_1.mp4",
//     title: "",
//     text: "I need your help",
//     rules: [
//       { text: "I need", ruleDescription: "Some 1 description about present simple or this concrete example.", ruleName: "Present Simple", color: "red" },
//       { text: " ", ruleDescription: "", ruleName: "", color: "white" },
//       { text: "your help", ruleDescription: "Some 2 description about past perfect example.", ruleName: "Past Perfect", color: "blue" },
//     ],
//     type: TextType.Video,
//   },
//   {
//     id: "4",
//     posterUri: "/tbbt_1.jpeg",
//     videoUri: "/tbbt_3.mp4",
//     title: "",
//     text: "Oh yeah, those guy can be very stubborn",
//     rules: [
//       { text: "Oh yeah", ruleDescription: ". According to the Cambridge Dictionary, the present perfect tense is defined as “the form of the verb used for actions or events that have been completed or have happened in a period of time up to now.”", ruleName: "Present Simple", color: "red" },
//       { text: ", ", ruleDescription: "", ruleName: "", color: "" },
//       { text: "those guy can be very stubborn", ruleDescription: "Some 4 description about past perfect example.", ruleName: "Past Perfect", color: "teal" },
//     ],
//     type: TextType.Video,
//   },
//   {
//     id: "5",
//     posterUri: "/tbbt_1.jpeg",
//     videoUri: "/tbbt_4.mp4",
//     title: "",
//     text: "I'm asserting in the event of Batman's death proves permanent, the original Robin, Dick Grayson, is the logical successor to the Bat Cowl",
//     rules: [
//       { text: "I'm asserting", ruleDescription: "Some 5 description about present simple or this concrete example.", ruleName: "Present Simple", color: "red" },
//       { text: " in the event of Batman's ", ruleDescription: "", ruleName: "", color: "" },
//       { text: "death proves permanent ", ruleDescription: "Some 6 description about past perfect example.", ruleName: "Past Perfect", color: "orange" },
//       { text: ", the original Robin, ", ruleDescription: "", ruleName: "", color: "" },
//       { text: "Dick Grayson, is the logical successor ", ruleDescription: "Some more rule ... .. ..asd. as.d.as.d .asd. ...", ruleName: "Past Perfect Continuous", color: "blue" },
//       { text: "to the Bat Cowl", ruleDescription: "", ruleName: "", color: "" },
//     ],
//     type: TextType.Video,
//   },
//   {
//     id: "6",
//     posterUri: "/tbbt_1.jpeg",
//     videoUri: "/tbbt_5.mp4",
//     title: "",
//     text: " I'm afraid you couldn't be more wrong",
//     rules: [
//       { text: "I'm afraid", ruleDescription: "Some 1 description about present simple or this concrete example.", ruleName: "Present Simple", color: "red" },
//       { text: " ", ruleDescription: "", ruleName: "", color: "" },
//       { text: "you couldn't be more wrong", ruleDescription: "Some 2 description about past perfect example.", ruleName: "Past Perfect", color: "cyan" },
//     ],
//     type: TextType.Video,
//   },
//   {
//     id: "7",
//     posterUri: "",
//     videoUri: "",
//     title: "Вы посмотрели демо",
//     text: "Перед полноценным запуском проекта, хотелось бы услышать ваши впечатления и отзывы. Прошу вас оставить комментарии в блоге (ссылка Blog выше).",
//     rules: [
//       { text: "Перед полноценным запуском проекта, хотелось бы услышать ваши впечатления и отзывы. Прошу вас оставить комментарии в блоге (ссылка Blog выше).", ruleDescription: "", ruleName: "", color: "" },
//     ],
//     type: TextType.Form,
//   },
// ];


async function getData(): Promise<Text[]> {
  const res = await fetch('http://localhost:3000/api?1');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const repo : Text[] = await res.json();

  return repo;
}

export default async function Page({ params }: { params: { section: string; slug: string } }) {
  console.log("/Page rerender")
  const videos = await getData();

  let tmpIdx = videos.findIndex((element: Text) => element.id == params.slug)
  if (tmpIdx < 0 || tmpIdx >= videos.length - 1) {
    tmpIdx = 0
  }
  let currentVideo = videos[tmpIdx]

  return (
    <div>
      <LessonHolder currentText={currentVideo} tmpVideos={videos} />
    </div>
  );
}