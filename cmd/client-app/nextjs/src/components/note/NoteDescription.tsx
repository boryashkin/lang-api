import { MouseEventHandler } from "react";

export default function NoteDescription(props: {title: string, text: string, hidden: boolean, onclick: MouseEventHandler<Element> | undefined}) {
    console.log("Lesson rerendered")
    return (
        <div onClick={props.onclick} hidden={props.hidden} className="note-description text-gray-900 whitespace-pre-wrap fixed lg:absolute w-56 lg:w-64 pl-3 pr-6 py-3 rounded-lg top-20 right-4 sm:top-6 sm:rounded-lg bg-yellow-50 text-left drop-shadow-xl m-auto z-50">
            <svg className="absolute top-1 right-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
            <b>{props.title}</b><br/>
            {props.text}
        </div>
    )
}