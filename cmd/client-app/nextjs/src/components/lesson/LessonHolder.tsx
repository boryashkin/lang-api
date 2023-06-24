'use client';

import NoteDescriptionContent from "@/interfaces/NoteDescriptionContent";
import Text from "@/interfaces/Text";
import { useEffect, useState } from "react";

import NoteDescription from "../note/NoteDescription";
import { Lesson } from "./Lesson";

const EMPTY_NODE_DESCRIPTION: NoteDescriptionContent = { title: "", text: "" }

export function LessonHolder(props: { text: Text }) {
    const [noteText, setNoteText] = useState(EMPTY_NODE_DESCRIPTION);

    // todo: it can be rewritten to useEffect: don't pass the handleSpanClick through Lesson components, just listen for "span#notification".onclick 
    const handleSpanClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNoteText({ title: event.currentTarget.title, text: event.currentTarget.getAttribute("data-body") ?? "" })
    }

    return (
        <>
            <NoteDescription title={noteText.title} text={noteText.text} hidden={noteText.title == ""} onclick={() => { setNoteText(EMPTY_NODE_DESCRIPTION) }} />
            <div className="bg-white sm:px-4 pb-4 pt-0 sm:p-6 sm:pb-4">
                <Lesson text={props.text} handleSpanClick={handleSpanClick} />
            </div>
        </>
    )
}

export default function LessonListContainer(props: { currentText: Text; tmpVideos: Text[] }) {
    const [currentTextL, setCurrentTextL] = useState(props.currentText);

    const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        let tmpIdx = props.tmpVideos.findIndex((element: Text) => element.id == currentTextL.id)
        if (tmpIdx < 0 || tmpIdx >= props.tmpVideos.length - 1) {
            tmpIdx = -1
        }
        setCurrentTextL(props.tmpVideos[tmpIdx + 1])
        window.history.pushState({}, "", props.tmpVideos[tmpIdx + 1].id)
    }


    return (
        <div id="lesson_container" className="mx-auto container">
            <div className="relative sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
                <LessonHolder text={currentTextL} />
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" onClick={handleNext} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Вперёд</button>
                </div>
            </div>
        </div>
    )
}