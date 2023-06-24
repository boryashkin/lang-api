
'use client';

import { useSearchParams } from 'next/navigation'
import { Media } from '@/proto/generated/Media';
import LessonCreator from '../lesson/LessonCreator';
import { MouseEventHandler, useState } from 'react';

function MediaItemSelectable(props: { item: Media, handleItemClick: MouseEventHandler<Element> | undefined }) {
    return (
        <div className="box-border">
            <MediaItem item={props.item} />
            <button 
                onClick={props.handleItemClick} 
                className="mx-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                data-id={props.item.id}
                data-type={props.item.type}
                data-uri={props.item.uri}
                data-uri-thumbnail={props.item.uriThumbnail}
                data-text={props.item.text}
            >Select ⤴️</button>
        </div>
    )
}

function MediaItem(props: { item: Media }) {
    return (
        <div className="box-border w-80 sm:h-64 mx-2 my-4 sm:my-2">
            <img src={props.item.uriThumbnail} />
            <div>{props.item.text}</div>
        </div>
    )
}

const EMPTY_MEDIA : Media|undefined = undefined

export default function MediaList(props: { lessonId: string, items: Media[] }) {
    const [item, setItem] = useState(EMPTY_MEDIA);
    const searchParams = useSearchParams()
    const text = searchParams.get('text') ?? ""

    const handleItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget)
        let newItem : Media = {
            id: event.currentTarget.getAttribute("data-id") ?? undefined,
            type: event.currentTarget.getAttribute("data-type") ?? undefined,
            uri: event.currentTarget.getAttribute("data-uri") ?? undefined,
            uriThumbnail: event.currentTarget.getAttribute("data-uri-thumbnail") ?? undefined,
            text: event.currentTarget.getAttribute("data-text") ?? undefined,
        }
        setItem(newItem)
    }

    const listItems = props.items.map((item) =>
        <MediaItemSelectable key={item.id} item={item} handleItemClick={handleItemClick}/>
    );

    return (
        <div id="media-list" className="mx-auto container">
            <LessonCreator lessonId={props.lessonId} item={item} closingHandler={() => {if (confirm("Are you sure?")) {setItem(undefined)}}}/>
            <div className="relative sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                    <h3>Составление урока</h3>
                </div>
                <div className="bg-white px-4 pb-4 pt-0 sm:p-6 sm:pb-4 flex flex-wrap">
                    Найдите и добавьте элемент в урок
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                    <form className="flex flex-row" method="get">
                        <input className="mx-2 px-2 border rounded-md border-gray-200" id="media_list_search" name='text' placeholder='Search' defaultValue={text} />
                        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Искать</button>
                    </form>
                </div>
                <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 flex flex-wrap">
                    {listItems}
                </div>
            </div>
        </div>
    )
}