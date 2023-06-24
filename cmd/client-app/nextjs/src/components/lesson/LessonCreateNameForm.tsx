'use client';

import { getStringFromFromValue } from "@/helpers/FormHelpers";
import { CreateLessonReply } from "@/proto/generated/CreateLessonReply";
import slugify from "@sindresorhus/slugify";
import { FormEvent, useState } from "react"

export default function LessonCreateForm() {
  const [lessonNameValues, setLessonNameValues] = useState({name: "", slug: "", autoSlug: true});
  const [formError, setFormError] = useState("");

  const handleFormTrigger = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let form: HTMLFormElement = e.currentTarget
    let data = new FormData(form)
    // todo validate input!
    

    let slug = getStringFromFromValue(data.get("lesson-slug"))
    let slugified = slugify(slug)
    if (slug != slugified) {
        slug = slugified
        setLessonNameValues((state) => {
            return {
                name: state.name,
                slug: slugified,
                autoSlug: state.autoSlug,
            }
        })
    }
    console.log("BEFORE SENDING")
    const JSONdata = JSON.stringify({name: lessonNameValues.name, slug: lessonNameValues.slug})
    const endpoint = '/api/lessons'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
 
    const response = await fetch(endpoint, options)

    if (!response.ok) {
        setFormError("Error")
        return
    }
    
    const result : CreateLessonReply = await response.json()
    
    window.location.href = "/studio/lesson/" + result.id
  }
  

  const handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value)
    
    if (name == "lesson-name") {
        setLessonNameValues((state) => {
            let slug = state.slug
            if (state.autoSlug) {
                slug = slugify(value)
            }
            return {
                name: value,
                slug: slug,
                autoSlug: state.autoSlug
            }
          })
    } else if (name == "lesson-auto-slug") {
        setLessonNameValues((state) => {
            return {
                name: state.name,
                slug: state.slug,
                autoSlug: value
            }
          })
    } else if (name == "lesson-slug") {
        setLessonNameValues((state) => {
            if (!state.autoSlug) {
                return {
                    name: state.name,
                    slug: value,
                    autoSlug: state.autoSlug
                }
            }
            return state
          })
    }
    setFormError("")
  }

  return (
    <form className="" method="get" onSubmit={handleFormTrigger}>
            <input name="lesson-name" onChange={handleInputChange} className="mx-2 px-2 py-2 border rounded-md border-gray-200" placeholder='Lesson name' value={lessonNameValues.name} />
            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Создать</button>
            <br />
            <input name="lesson-auto-slug" onChange={handleInputChange} className="mx-2 px-2 py-2 border rounded-md border-gray-200" type="checkbox" checked={lessonNameValues.autoSlug} /> Генерировать URL автоматически
            <br />
            <input name="lesson-slug" onChange={handleInputChange} className="mx-2 px-2 py-2 border rounded-md border-gray-200" placeholder='URL' value={lessonNameValues.slug} />
            <div className="text-red-600">
                {formError}
            </div>
          </form>
  );
}
