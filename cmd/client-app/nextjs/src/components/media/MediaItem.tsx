import { Media } from "@/proto/generated/Media";

export default function MediaItem(props: { item: Media }) {
    return (
        <div className="box-border w-80 sm:h-64 mx-2 my-4 sm:my-2">
            {props.item.uriThumbnail ? <img src={props.item.uriThumbnail} /> : <div className="w-80 h-44 bg-gray-100 text-white text-center py-16"><span className="m-auto">Text block</span></div>}
            <div>{props.item.text}</div>
        </div>
    )
}