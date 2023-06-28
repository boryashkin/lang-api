'use client';

import MediaItem from "../media/MediaItem";
import { LessonElement } from "@/proto/generated/LessonElement";


export default function LessonElements(props: { items: LessonElement[] }) {
    
    const listItems = props.items.map((item) =>
        item.media ? <MediaItem key={item.id} item={item.media} /> : <></>
    );

    return (
        <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 flex flex-wrap flex-row">
            {listItems}
        </div>
    )
}