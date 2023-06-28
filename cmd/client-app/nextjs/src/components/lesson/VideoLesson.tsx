import Text from "@/interfaces/Text";
import { MouseEventHandler, memo, useEffect } from "react";
import { TextSpanList } from "./TextSpanList";

const VideoContainer = memo(function VideoContainer(props: { poster: string, src: string }) {
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
            }, { once: true })
        }
    }, [props.src]);

    return (<video className="m-auto" width={720} height={405} poster={props.poster} preload="auto" controls={false} autoPlay={true} muted={false} playsInline={true} loop={false} id="video">
                <source type="video/mp4" src={props.src} id="mp4"></source>
                <p>Your user agent does not support the HTML5 Video element.</p>
            </video>);
  });

export function VideoLesson(props: { text: Text; handleSpanClick: MouseEventHandler<Element> | undefined }) {
    console.log("VideoLesson rerendered")

    return (
        <>
        <h3 className="text-base font-semibold leading-6 text-gray-900 lg:text-2xl" id="modal-title">{props.text.title}</h3>
            <VideoContainer src={props.text.mediaUri} poster={props.text.posterUri} />
            <div id="text_content" className="text-center mt-3">
                <div className="text-2xl text-black"><TextSpanList text={props.text} handleSpanClick={props.handleSpanClick} /></div>
            </div>
        </>
    )
}