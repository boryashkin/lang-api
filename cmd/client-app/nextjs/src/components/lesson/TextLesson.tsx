import Text from "@/interfaces/Text";
import { MouseEventHandler } from "react";
import { TextSpanList } from "./TextSpanList";

export function TextLesson(props: {text: Text; handleSpanClick: MouseEventHandler<Element> | undefined}) {
    console.log("TextLesson rerendered")
    return (
      <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900 lg:text-2xl" id="modal-title">{props.text.title}</h3>
                <div className="mt-2">
                  <p className="text-sm lg:text-lg text-gray-500 whitespace-pre-wrap">
                  <TextSpanList text={props.text} handleSpanClick={props.handleSpanClick}/>
                    </p>
                </div>
              </div>
            </div>
    )
}