// src/components/bookform.js
"use client"

import { useRef, useEffect } from "react"
import { toast } from "react-toastify"

export default function BookForm({ formAction, formState, data = {} }) {
    const formRef = useRef(null)

    useEffect(function () {
        if (formState?.success) {
            toast.success("Book created")
            formRef.current?.reset()
        }
    }, [formState]) // <--- [] hedder et "dependency array"

    return (
        <form action={formAction} ref={formRef}>
            <label className="block">
                Title
                <input value={data.title} type="text" name="title" className="text-black" />
            </label>
            <label className="block">
                Author
                <input value={data.author} type="text" name="author" className="text-black" />
            </label>
            {/* <Input label="Title" type="text" name="title" statusMessage={formState?.title?._errors} />
			<Input label="Author" type="text" name="author" statusMessage={formState?.author?._errors} /> */}
            <button type="submit" className="bg-orange-500 text-black px-4 py-1 uppercase font-semibold rounded-full">Add Book</button>
        </form>
    )
}
