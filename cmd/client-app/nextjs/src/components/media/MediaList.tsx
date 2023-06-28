
'use client';

import { useSearchParams } from 'next/navigation'
import { Media } from '@/proto/generated/Media';
import LessonCreator from '../lesson/LessonCreator';
import { MouseEventHandler, useState } from 'react';
import MediaItem from './MediaItem';
import LessonElements from '../lesson/LessonElements';
import { LessonElement } from '@/proto/generated/LessonElement';
import { Lesson } from '@/proto/generated/Lesson';
import { TextType } from '@/interfaces/Text';
import MediaCreator from './MediaCreator';

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

const EMPTY_MEDIA: Media | undefined = undefined
const EMPTY_TEXT_MEDIA_PLACEHOLDER = { text: "Your custom text lesson, select to create a text block", type: TextType.Text }

export default function MediaListWithCreator(props: { lesson: Lesson, queriedItems: Media[], lessonElements: LessonElement[] }) {
    const [item, setItem] = useState(EMPTY_MEDIA);
    const [showMediaCreator, setShowMediaCreator] = useState(false);
    const searchParams = useSearchParams()
    const text = searchParams.get('text') ?? ""
    let offset = parseInt(searchParams.get('offset') ?? "0")
    let limit = parseInt(searchParams.get('limit') ?? "30")
    if (isNaN(offset) || offset < 0) {
        offset = 0
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
        offset = 30
    }

    const handleItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget)
        let newItem: Media = {
            id: event.currentTarget.getAttribute("data-id") ?? undefined,
            type: event.currentTarget.getAttribute("data-type") ?? undefined,
            uri: event.currentTarget.getAttribute("data-uri") ?? undefined,
            uriThumbnail: event.currentTarget.getAttribute("data-uri-thumbnail") ?? undefined,
            text: event.currentTarget.getAttribute("data-text") ?? undefined,
        }
        if (newItem.type == TextType.Text) {
            setShowMediaCreator(true)
            return
        }
        setItem(newItem)
    }
    const nextPageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget)
        event.preventDefault()
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set("offset", "" + (offset + limit));
        window.location.search = searchParams.toString();
    }

    const listItems = props.queriedItems.map((item) =>
        <MediaItemSelectable key={item.id} item={item} handleItemClick={handleItemClick} />
    );

    return (
        <div id="media-list" className="mx-auto container">
            <LessonCreator lessonId={props.lesson.id ?? "no-id"} item={item} closingHandler={() => { if (confirm("Are you sure?")) { setItem(undefined) } }} />
            <MediaCreator show={showMediaCreator} createdHandler={setItem} closingHandler={() => { setShowMediaCreator(false) }} />
            <div className="relative sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                    <h3>Составление урока</h3>
                </div>
                <div className="bg-white px-4 pt-3">
                    {props.lessonElements.length > 0 ? "Текущие элементы урока" : "Найдите и добавьте элемент в урок"}
                    <div className={props.lessonElements.length > 0 ? "" : "hidden"}>
                        <a className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" href={"/lesson/" + props.lesson.slug} target='_blank'>Предпросмотр урока</a>
                    </div>
                </div>
                <div className="bg-white pb-4 pt-0 sm:pb-4 flex flex-wrap">
                    <LessonElements items={props.lessonElements} />

                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                    <form className="flex flex-row" method="get">
                        <input className="mx-2 px-2 border rounded-md border-gray-200" id="media_list_search" name='text' placeholder='Search' defaultValue={text} />
                        <button type="submit" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Искать</button>
                    </form>
                </div>
                <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4 flex flex-wrap">
                    {offset == 0 ?
                        <MediaItemSelectable key="text-based" item={EMPTY_TEXT_MEDIA_PLACEHOLDER} handleItemClick={handleItemClick} />
                        :
                        <></>
                    }

                    {listItems}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                    <button onClick={nextPageClick} className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Далее</button>
                </div>
            </div>
        </div>
    )
}