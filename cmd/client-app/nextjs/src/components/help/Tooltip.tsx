import { useState } from "react"

export const Tooltip = (props: {btnTitle: string, tooltip: string}) => {
    const [hide, setHide] = useState(true)
    return (
        <div className="static inline-block">
            <button onClick={() => {setHide((state) => {return !state})}} type="button" className="mx-2 text-white bg-slate-300 hover:bg-slate-400 focus:ring-1 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{props.btnTitle}</button>
            <div 
                role="tooltip" 
                className={(hide ? "hidden " : "") + "whitespace-break-spaces z-50 p-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-600 rounded-lg shadow-sm tooltip dark:bg-gray-700"}
            >
                <pre>
                    {props.tooltip}
                </pre>
            </div>
        </div>
    )
}