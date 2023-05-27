'use client';

import NoteDescriptionContent from "@/interfaces/NoteDescriptionContent";
import Text, { TextType } from "@/interfaces/Text";
import { MouseEventHandler, useEffect, useState } from "react";
import { VideoLesson } from "./VideoLesson";
import { TextLesson } from "./TextLesson";
import NoteDescription from "../note/NoteDescription";
const tmpVideos : Text[]= [
  
    {
      id: "2",
      posterUri: "",
      videoUri: "",
      title: "Правила будут выделены цветами",
      text: "Нажимайте на цветной текст, чтобы увидеть их описания.",
      rules: [
        {text: "Правила будут выделены ", ruleDescription: "", ruleName: "", color: ""},
        {text: "цветами", ruleDescription: "Вот так", ruleName: "Описание", color: "red"},
      ],
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
      rules: [
        {text: "Перед полноценным запуском проекта, хотелось бы услышать ваши впечатления и отзывы. Прошу вас оставить комментарии в блоге (ссылка Blog выше).", ruleDescription: "", ruleName: "", color: ""},
      ],
      type: TextType.Form,
    },
  ];

const EMPTY_NODE_DESCRIPTION: NoteDescriptionContent = { title: "", text: "" }

function Lesson(props: { text: Text; handleSpanClick: MouseEventHandler<Element> | undefined }) {
    if (props.text.type == TextType.Video) {
        return <VideoLesson {...props} />
    }

    return <TextLesson {...props} />
}

export default function LessonHolder(props: { currentText: Text }) {
    const [currentTextL, setCurrentTextL] = useState(props.currentText);
    const [noteText, setNoteText] = useState(EMPTY_NODE_DESCRIPTION);

    // todo: it can be rewritten to useEffect: don't pass the handleSpanClick through Lesson components, just listen for "span#notification".onclick 
    const handleSpanClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNoteText({ title: event.currentTarget.title, text: event.currentTarget.getAttribute("data-body") ?? "" })
    }

    const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        let tmpIdx = tmpVideos.findIndex((element: Text) => element.id == currentTextL.id)
        if (tmpIdx < 0 || tmpIdx >= tmpVideos.length - 1) {
            tmpIdx = 0
        }
        setCurrentTextL(tmpVideos[tmpIdx+1])
        window.history.pushState({}, "", tmpVideos[tmpIdx+1].id)
    }
    useEffect(() => {
        let vid = document.getElementById("video")
        if (vid instanceof HTMLVideoElement) {
            vid.load()
            vid.controls = false
            vid.play().catch((reason: any) => { 
                console.log("error"); 
                if (vid instanceof HTMLVideoElement) {
                    vid.controls = true
                }
            })
            vid.addEventListener("ended", (event) => {
                console.log("HANDLER VID")
                if (event.currentTarget instanceof HTMLVideoElement) {
                    event.currentTarget.controls = true
                }
            }, {once: true})
        }
    }, [currentTextL]);
    

    return (
        <div id="lesson_container" className="mx-auto container">
            <div className="relative overflow-hidden sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
                <NoteDescription title={noteText.title} text={noteText.text} hidden={noteText.title == ""} onclick={() => { setNoteText(EMPTY_NODE_DESCRIPTION) }} />
                <div className="bg-white sm:px-4 pb-4 pt-0 sm:p-6 sm:pb-4">
                    <Lesson text={currentTextL} handleSpanClick={handleSpanClick} />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" onClick={handleNext} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Вперёд</button>
                </div>
            </div>
        </div>
    )
}