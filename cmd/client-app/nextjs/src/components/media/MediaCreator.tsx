'use client';

import { Media } from "@/proto/generated/Media";
import { ChangeEvent, FormEvent, useState } from "react";
import { TextType } from "@/interfaces/Text";

const emptyMedia: Media = {type: TextType.Text}

const addTextMedia = async (text: string) : Promise<Media|undefined> => {
    let newMedia : Media = {
        type: TextType.Text,
        text: text,

    }
    const JSONdata = JSON.stringify(newMedia)
    const endpoint = '/api/media'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
 
    const response = await fetch(endpoint, options)

    if (!response.ok) {
        console.error("addTextMedia", response.status)
        return
    }

    let res : Media = await response.json()
    console.log("addTextMedia", response.status)

    return res
}

export default function MediaCreator(props: { show: boolean, createdHandler: (item: Media) => void, closingHandler: () => void }) {
    const [media, setMedia] = useState(emptyMedia);
    
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMedia((state) => {
            state.text = e.target.value

            return state
        })
    }
    const handleSubmitTrigger = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setMedia((state) => {
            if (state.text && state.text != "") {
                addTextMedia(state.text)
                .then((item: Media|undefined) => {
                    if (item) {
                        props.createdHandler(item)
                        props.closingHandler()
                    }
                }).catch((e: any) => {
                    console.error(e)
                    alert("Error while saving the media. Try again.")
                })
            }
            return state
        })
    }
    
    if (!props.show) {
        return <></>
    }
    
    return (
        <div className="mx-auto container">

            <div id="staticModalMedia" data-modal-backdrop="static" tabIndex={-1} aria-hidden="false" className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-opacity-30 bg-black">
                <div className="relative w-full max-w-2xl max-h-full m-auto">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Подготовьте текст для элемента урока
                            </h3>
                            <button onClick={props.closingHandler} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <textarea onChange={handleTextChange} name="text" className="text-lg w-full" placeholder="Enter your text..."></textarea>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleSubmitTrigger} data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save text</button>
                            <button onClick={props.closingHandler} data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}