'use client';

import NoteDescriptionContent from "@/interfaces/NoteDescriptionContent";
import Text, { TextType } from "@/interfaces/Text";
import { MouseEventHandler, useEffect, useState } from "react";
import { VideoLesson } from "./VideoLesson";
import { TextLesson } from "./TextLesson";
import NoteDescription from "../note/NoteDescription";

const EMPTY_NODE_DESCRIPTION: NoteDescriptionContent = { title: "", text: "" }

function Lesson(props: { text: Text; handleSpanClick: MouseEventHandler<Element> | undefined }) {
    if (props.text.type == TextType.Video) {
        return <VideoLesson {...props} />
    }

    return <TextLesson {...props} />
}

export default function LessonHolder(props: { currentText: Text; tmpVideos: Text[]}) {
    const [currentTextL, setCurrentTextL] = useState(props.currentText);
    const [noteText, setNoteText] = useState(EMPTY_NODE_DESCRIPTION);

    // todo: it can be rewritten to useEffect: don't pass the handleSpanClick through Lesson components, just listen for "span#notification".onclick 
    const handleSpanClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNoteText({ title: event.currentTarget.title, text: event.currentTarget.getAttribute("data-body") ?? "" })
    }

    const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        let tmpIdx = props.tmpVideos.findIndex((element: Text) => element.id == currentTextL.id)
        if (tmpIdx < 0 || tmpIdx >= props.tmpVideos.length - 1) {
            tmpIdx = -1
        }
        setCurrentTextL(props.tmpVideos[tmpIdx+1])
        window.history.pushState({}, "", props.tmpVideos[tmpIdx+1].id)
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
            <div className="relative sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
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