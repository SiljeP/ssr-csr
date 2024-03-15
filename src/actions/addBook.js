"use server"

import books from "@/models/books"
import { connect, disconnect } from "@/lib/db"
import { z } from "zod"

import { redirect } from "next/navigation"

const UserSchema = z.object({
    title: z.string().min(1, { message: "This field is required" }),
    author: z.string().min(1, { message: "This field is required" }),
    pages: z.number()
})

export async function addBook(prevState, formData) {
    const title = formData.get("title")
    const author = formData.get("author")
    const pages = Number(formData.get("pages"))

    const validated = UserSchema.safeParse({ title, author, pages })

    if (!validated.success) {
        return validated.error.format()
    }

    if (validated.success) {
        await connect()
        const newBook = new books({
            title: title,
            author: author,
            pages: pages,
        })
        await newBook.save()
        await disconnect()
    }

    const bookAddedMessage = console.log(title, author, pages);

    return { success: true, redirect: "/booklibrary" }
}