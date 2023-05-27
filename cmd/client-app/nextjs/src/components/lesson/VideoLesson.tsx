import Text from "@/interfaces/Text";
import { MouseEventHandler } from "react";
import { TextSpanList } from "./TextSpanList";

export function VideoLesson(props: { text: Text; handleSpanClick: MouseEventHandler<Element> | undefined }) {
    console.log("VideoLesson rerendered")
    return (
        <>
            <video className="m-auto" width={720} height={405} poster={props.text.posterUri} preload="auto" controls={false} autoPlay={false} muted={false} playsInline={true} loop={false} id="video">
                <source type="video/mp4" src={props.text.videoUri} id="mp4"></source>
                <p>Your user agent does not support the HTML5 Video element.</p>
            </video>
            <div id="text_content" className="text-center mt-3">
                <div className="text-2xl text-black"><TextSpanList text={props.text} handleSpanClick={props.handleSpanClick} /></div>
            </div>
        </>
    )
}