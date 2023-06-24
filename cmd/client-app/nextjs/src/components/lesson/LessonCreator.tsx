'use client';

import { Media } from "@/proto/generated/Media";
import { FormEvent, useEffect, useState } from "react";
import Text, { TextType } from "@/interfaces/Text";
import { LessonHolder } from "./LessonHolder";
import { getNumberFromFromValue, getStringFromFromValue } from "@/helpers/FormHelpers";

interface SelectedItem {
    start: number
    stop: number
    color: string
    note: string
}

const emptySelection: SelectedItem[] = [];
const emptyText: Text = {
    id: "",
    posterUri: "",
    mediaUri: "",
    title: "",
    text: "",
    rules: [],
    type: TextType.Text
};
const createTextFromProps = (item: Media | undefined): Text => {
    if (!item) {
        console.log("returned empty")
        return emptyText
    }

    let result = {
        id: item.id ?? "",
        posterUri: item.uriThumbnail ?? "",
        mediaUri: item.uri ?? "",
        title: "preview",
        text: item.text ?? "",
        rules: [],
        type: (item.type ?? TextType.Text) as TextType
    }
    console.log(result, typeof result.type, typeof TextType.Video, result.type == TextType.Video)

    return result
}
const createTextFromSelected = (media: Media | undefined, selected: SelectedItem[]): Text => {
    let item = createTextFromProps(media)
    if (selected.length == 0) {
        return item
    }
    let originalText = media?.text ?? ""
    if (originalText.length == 0) {
        console.error("empty original text", media?.id)
        return item
    }

    let sortedSelected = selected.sort((a: SelectedItem, b: SelectedItem): number => { return a.start - b.start })
    console.log(selected, sortedSelected)


    let selectedI = 0
    let state = 0 // 0 - none, 1 - empty, 2 - selected
    let curStart = 0
    let curEnd = 0
    let addRule = (start: number, stop: number, ruleName: string, ruleDescription: string, color: string) => {
        item.rules.push({
            ruleName: ruleName,
            ruleDescription: ruleDescription,
            text: originalText.substring(start, stop + 1),
            color: color
        })
    }
    for (let i = 0; i < originalText.length; i++) {
        let selectedItem = sortedSelected[selectedI]
        console.log("selectedI", selectedI)

        if (state == 0) { //none
            curStart = i
            if (selectedItem && selectedItem.start == i) {
                state = 2
                continue
            } else {
                state = 1
            }
            continue

        } else if (state == 1) { // empty
            if (selectedItem && selectedItem.start == i) {
                curEnd = i - 1
                addRule(curStart, curEnd, "", "", "")
                curStart = i
                state = 2
            } else if (i == originalText.length - 1) {
                curEnd = i
                addRule(curStart, curEnd, "", "", "")
            }
            continue
        } else { // selected
            if (selectedItem && i == selectedItem.stop) {
                curEnd = i
                addRule(curStart, curEnd, "todo1", selectedItem.note, selectedItem.color)
                selectedI++
                state = 0
            }
            continue
        }
    }

    return item
}

function RuleForm(props: { 
    index: number, 
    item: Media | undefined, 
    handleSelectedTrigger: (e: FormEvent<HTMLFormElement>) => void 
}) {
    return (
        <form data-index={props.index} onChange={props.handleSelectedTrigger}>
            Character positions:
            Start: <input
                type="number"
                name="start"
                inputMode="numeric"
                pattern="[0-9]*"
                min={0} max={props.item?.text?.length ?? 0} className="mx-2 px-2 border rounded-md border-gray-200" />
            Stop: <input
                type="number"
                name="stop"
                inputMode="numeric"
                pattern="[0-9]*"
                min={0} max={props.item?.text?.length ?? 0} className="mx-2 px-2 border rounded-md border-gray-200" />
            Color:
            <select name="color" className="mx-2 px-2 border rounded-md border-gray-200" >
                <option value="slate" className="bg-slate-200">slate</option>
                <option value="gray" className="bg-gray-200">gray</option>
                <option value="zinc" className="bg-zinc-200">zinc</option>
                <option value="neutral" className="bg-neutral-200">neutral</option>
                <option value="stone" className="bg-stone-200">stone</option>
                <option value="orange" className="bg-orange-200">orange</option>
                <option value="red" className="bg-red-200">red</option>
                <option value="amber" className="bg-amber-200">amber</option>
                <option value="yellow" className="bg-yellow-200">yellow</option>
                <option value="lime" className="bg-lime-200">lime</option>
                <option value="green" className="bg-green-200">green</option>
                <option value="emerald" className="bg-emerald-200emerald"></option>
                <option value="teal" className="bg-teal-200">teal</option>
                <option value="cyan" className="bg-cyan-200">cyan</option>
                <option value="sky" className="bg-sky-200">sky</option>
                <option value="blue" className="bg-blue-200">blue</option>
                <option value="indigo" className="bg-indigo-200">indigo</option>
                <option value="violet" className="bg-violet-200">violet</option>
                <option value="purple" className="bg-purple-200">purple</option>
                <option value="fuchsia" className="bg-fuchsia-200">fuchsia</option>
                <option value="pink" className="bg-pink-200">pink</option>
                <option value="rose" className="bg-rose-200">rose</option>
            </select>
            <br />
            Text on a note:
            <textarea name="note" className="mx-2 px-2 border rounded-md border-gray-200"></textarea>
        </form>
    )
}

async function addElementToALesson(lessonId: string, item: Media, selected: SelectedItem[]) {
    console.log("addElementToALesson", lessonId, item, selected)
    return
    const JSONdata = JSON.stringify({})
    const endpoint = '/api/lesson/' + lessonId
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
 
    const response = await fetch(endpoint, options)

    if (!response.ok) {
        //setFormError("Error")
        return
    }
    
    //const result : CreateLessonReply = await response.json()
}

export default function LessonCreator(props: { lessonId: string, item: Media | undefined, closingHandler: () => void }) {
    if (!props.item) {
        return <></>
    }
    const [selected, setSelected] = useState(emptySelection);
    const handleSelectedTrigger = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let form: HTMLFormElement = e.currentTarget
        let idx = parseInt(form.getAttribute("data-index") ?? "0")
        console.log("form idx", idx)
        let data = new FormData(form)
        // todo validate input!


        let selection: SelectedItem = {
            start: getNumberFromFromValue(data.get("start")),
            stop: getNumberFromFromValue(data.get("stop")),
            color: getStringFromFromValue(data.get("color")),
            note: getStringFromFromValue(data.get("note")),
        }
    
        setSelected((state) => {
            console.log("before upd selected", idx, state); 
            state[idx] = selection; 
            console.log("after upd selected", idx, state); 
            return [...state]
        })

    }
    const handleSubmitTrigger = () => {
        setSelected((state) => {
            console.log("before submit", state)
            if (props.item) {
                addElementToALesson(props.lessonId, props.item, state)
            }
            return state
        })
    }
    const [currentText, setCurrentText] = useState(createTextFromProps(props.item));
    const [ruleForms, setRuleForms] = useState([
        <RuleForm key={0} index={0} item={props.item} handleSelectedTrigger={handleSelectedTrigger} />
    ]);

    useEffect(() => {
        console.log("useEffect selected")
        // do not mutate selected
        setCurrentText(createTextFromSelected(props.item, [...selected]))
    }, [selected])


    const pushNewRuleForm = (key: number) => {
        console.log("PUSHHH")
        ruleForms.push(
            <RuleForm key={key} index={key} item={props.item} handleSelectedTrigger={handleSelectedTrigger} />
        )
        setRuleForms([...ruleForms])
    }
    const popNewRuleForm = () => {
        ruleForms.pop()
        selected.pop()
        setRuleForms([...ruleForms])
        setSelected([...selected])
    }

    return (
        <div className="mx-auto container">

            <div id="staticModal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="false" className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-opacity-30 bg-black">
                <div className="relative w-full max-w-2xl max-h-full m-auto">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Подготовьте элемент для урока
                            </h3>
                            <button onClick={props.closingHandler} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <h3 className="text-lg">{props.item.text}</h3>
                        </div>

                        <div className="p-6 space-y-6 bg-gray-50">
                            {ruleForms}
                        </div>

                        <div className="p-6 space-y-6">
                            <button onClick={() => {pushNewRuleForm(ruleForms.length)}} type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">+</button>
                            <button onClick={() => popNewRuleForm()} type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">-</button>
                        </div>

                        <div className="p-6 space-y-6 relative">
                            Preview:
                            <LessonHolder text={currentText} />
                        </div>


                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleSubmitTrigger} data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add element to the lesson</button>
                            <button onClick={props.closingHandler} data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}