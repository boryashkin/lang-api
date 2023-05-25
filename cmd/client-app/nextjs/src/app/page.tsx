'use client';

import { MouseEventHandler, useEffect, useState } from 'react';
import Link from 'next/link';
import Text, {TextType} from '../interfaces/Text'
import NoteDescription from '@/components/note/NoteDescription';
import TextRule from '@/interfaces/TextRule';
import NoteDescriptionContent from '@/interfaces/NoteDescriptionContent';

const videos : Text[]= [
  {
    id: "1",
    posterUri: "",
    videoUri: "",
    title: "Сервис для изучения языков",
    text: "Учите английский на огромном количестве реальных примеров. Здесь вы можете отработать как правила языка, так и произношение.\n\nСмотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с выбранными фильтрами.\nНажмите Вперёд, чтобы продолжить.",
    rules: [
      {text: "Учите английский на огромном количестве ", ruleDescription: "", ruleName: "", color: ""},
      {text: "реальных примеров", ruleDescription: "Примеры взяты из сериалов, фильмов, блогов и подкастов", ruleName: "Описание", color: "red"},
      {text: ". Здесь вы можете отработать как правила языка, так и произношение. \n\nСмотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с ", ruleDescription: "", ruleName: "", color: ""},
      {text: "выбранными фильтрами", ruleDescription: "Например, можно выбрать времена (12 english tenses), части речи, языковые конструкции и т.п.", ruleName: "Функционал фильтров", color: "cyan"},
      {text: ".\n", ruleDescription: "", ruleName: "", color: ""},
      {text: "Нажмите Вперёд", ruleDescription: "Кнопка Вперёд перенесет вас на следующий пример", ruleName: "Механика", color: ""},
      {text: ", чтобы продолжить.", ruleDescription: "", ruleName: "", color: ""},
    ],
    type: TextType.Text,
  },
  {
    id: "2",
    posterUri: "",
    videoUri: "",
    title: "Правила будут выделены цветами",
    text: "Нажимайте на цветной текст, чтобы увидеть их описания.",
    rules: [],
    type: TextType.Text,
  },
  {
    id: "3",
    posterUri: "/tbbt_1.jpeg",
    videoUri: "/tbbt_1.mp4",
    title: "",
    text: "I need your help",
    rules: [
      {text: "I need", ruleDescription: "Some 1 description about present simple or this concrete example.", ruleName: "Present Simple", color: "red"},
      {text: " ", ruleDescription: "", ruleName: "", color: "white"},
      {text: "your help", ruleDescription: "Some 2 description about past perfect example.", ruleName: "Past Perfect", color: "blue"},
    ],
    type: TextType.Video,
  },
  {
    id: "4",
    posterUri: "/tbbt_1.jpeg",
    videoUri: "/tbbt_3.mp4",
    title: "",
    text: "Oh yeah, those guy can be very stubborn",
    rules: [
      {text: "Oh yeah", ruleDescription: ". According to the Cambridge Dictionary, the present perfect tense is defined as “the form of the verb used for actions or events that have been completed or have happened in a period of time up to now.”", ruleName: "Present Simple", color: "red"},
      {text: ", ", ruleDescription: "", ruleName: "", color: ""},
      {text: "those guy can be very stubborn", ruleDescription: "Some 4 description about past perfect example.", ruleName: "Past Perfect", color: "teal"},
    ],
    type: TextType.Video,
  },
  {
    id: "5",
    posterUri: "/tbbt_1.jpeg",
    videoUri: "/tbbt_4.mp4",
    title: "",
    text: "I'm asserting in the event of Batman's death proves permanent, the original Robin, Dick Grayson, is the logical successor to the Bat Cowl",
    rules: [
      {text: "I'm asserting", ruleDescription: "Some 5 description about present simple or this concrete example.", ruleName: "Present Simple", color: "red"},
      {text: " in the event of Batman's ", ruleDescription: "", ruleName: "", color: ""},
      {text: "death proves permanent ", ruleDescription: "Some 6 description about past perfect example.", ruleName: "Past Perfect", color: "orange"},
      {text: ", the original Robin, ", ruleDescription: "", ruleName: "", color: ""},
      {text: "Dick Grayson, is the logical successor ", ruleDescription: "Some more rule ... .. ..asd. as.d.as.d .asd. ...", ruleName: "Past Perfect Continuous", color: "blue"},
      {text: "to the Bat Cowl", ruleDescription: "", ruleName: "", color: ""},
    ],
    type: TextType.Video,
  },
  {
    id: "6",
    posterUri: "/tbbt_1.jpeg",
    videoUri: "/tbbt_5.mp4",
    title: "",
    text: " I'm afraid you couldn't be more wrong",
    rules: [
      {text: "I'm afraid", ruleDescription: "Some 1 description about present simple or this concrete example.", ruleName: "Present Simple", color: "red"},
      {text: " ", ruleDescription: "", ruleName: "", color: ""},
      {text: "you couldn't be more wrong", ruleDescription: "Some 2 description about past perfect example.", ruleName: "Past Perfect", color: "cyan"},
    ],
    type: TextType.Video,
  },
  {
    id: "7",
    posterUri: "",
    videoUri: "",
    title: "Вы посмотрели демо",
    text: "Перед полноценным запуском проекта, хотелось бы услышать ваши впечатления и отзывы. Прошу вас оставить комментарии в блоге (ссылка Blog выше).",
    rules: [],
    type: TextType.Form,
  },
];
function TextLesson(props: Text) {
  return (
    <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900 lg:text-2xl" id="modal-title">{props.title}</h3>
              <div className="mt-2">
                <p className="text-sm lg:text-lg text-gray-500 whitespace-pre-wrap">
                <TextSpanList text={props} handleSpanClick={() => {}}/>
                  </p>
              </div>
            </div>
          </div>
  )
}
const EMPTY_NODE_DESCRIPTION : NoteDescriptionContent = {title: "", text: ""}

function TextSpanList(props: {text: Text, handleSpanClick: MouseEventHandler<Element> | undefined}) {
  const listRules = props.text.rules.map((rule: TextRule, index: number) => {
    let spanClasses = ""
    if (rule.ruleName !== "") {
      spanClasses = "note-element rounded-lg"
      spanClasses += " bg-" + rule.color + "-200"
    }
    return <span key={"note-span-"+ props.text.id + "-" + index} data-body={rule.ruleDescription} onClick={props.handleSpanClick} className={spanClasses} title={rule.ruleName}>{rule.text}</span>
  });
  return (
    <>{listRules}</>
  );
}
function VideoLesson(props: Text) {
  const [noteText, setNoteText] = useState(EMPTY_NODE_DESCRIPTION);

  const handleSpanClick = (event: React.MouseEvent<HTMLButtonElement>) => {    
    setNoteText({title: event.currentTarget.title, text: event.currentTarget.getAttribute("data-body") ?? ""})
  }
  
  return (
    <div>
      <NoteDescription title={noteText.title} text={noteText.text} hidden={noteText.title==""} onclick={() => {setNoteText(EMPTY_NODE_DESCRIPTION)}}/>
      <video className="m-auto" width={720} height={405} poster={props.posterUri} preload="auto" controls={true} autoPlay={false} muted={false} playsInline={true} loop={false} id="video">
        <source type="video/mp4" src={props.videoUri} id="mp4"></source>
        <p>Your user agent does not support the HTML5 Video element.</p>
      </video>
      <div id="text_content" className="text-center mt-3">
        <div className="text-2xl text-black"><TextSpanList text={props} handleSpanClick={handleSpanClick}/></div>
      </div>
    </div>
  )
}
function Lesson(props: Text) {
  if (props.type == TextType.Video) {
    return <VideoLesson {...props}/>
  }

  return <TextLesson {...props}/>
}

function LessonHolderDesign2() {
  const [currentTextIdx, setCurrentTextIdx] = useState(0);
  let currentText = videos[currentTextIdx]
  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {    
    if (currentTextIdx < videos.length - 1) {
      setCurrentTextIdx(currentTextIdx+1)
    }
    
  }
  useEffect(() => {
    let vid = document.getElementById("video")
    if (vid instanceof HTMLVideoElement) {
      vid.load()
      vid.controls = false
      vid.play().catch((reason: any) => {console.log("error");})
      vid.addEventListener("ended", (event) => {
        if (event.currentTarget instanceof HTMLVideoElement) {
          event.currentTarget.controls = true
        }
      })
    }
  });

  return (

    <div id="lesson_container" className="mx-auto container">
      <div className="relative overflow-hidden sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
        <div className="bg-white sm:px-4 pb-4 pt-0 sm:p-6 sm:pb-4">
          <Lesson {...currentText} />
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          {currentTextIdx < videos.length - 1 && 
          <button type="button" onClick={handleNext} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Вперёд</button>
          }
        </div>
      </div>
    </div>
  )
}

// export default function Home() {
//   return (
//     <main>
//      <div className="flex flex-col sm:flex-row justify-between">
//       <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
//         <p className="w-auto sm:w-1/2">Lang api helps you to <Link href='/lesson'>learn</Link> language tenses and usage from real world examples</p>
//         </div>
//       <div className="px-0 w-full"><LessonHolderDesign2/></div>
//       <div className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
//         <p className="w-auto sm:w-1/2">The present perfect is formed from the present tense of the verb have and the past participle of a verb.</p>
//       </div>
//     </div>
//     </main>
//   )
// }
export default function Home() {
  return (
     <div className="py-10">
      <LessonHolderDesign2/>
     </div>
  )
}
