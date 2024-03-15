// src/actions/books.js
"use server"
import { connect, disconnect } from "@/lib/db"
import Book from "@/models/books"
import { z } from "zod"

const BookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
})

export async function createBook(prevState, formData) {
    const title = formData.get("title")
    const author = formData.get("author")

    const validated = BookSchema.safeParse({ title: title, author: author })

    if (!validated.success) {
        return validated.error.format()
    }

    try {
        await connect()
    } catch (error) {
        console.log(error)
        return { success: false, message: "Internal server error. Book was not created - try again." }
    }

    const book = new Book({
        title: title,
        author: author,
    })

    try {
        await book.save()
    } catch (error) {
        console.log(error)
        await disconnect()
        return { success: false, message: "Internal server error. Book was not created - try again." }
    }

    await disconnect()

    return { success: true, mesage: "Book was created successfully", title: "", author: "" }
}

export async function getBooks() {

    await connect()

    const books = await Book.find()

    await disconnect()

    return books
}

export async function deleteBook(id) {
    await connect()

    await Book.findByIdAndDelete(id)

    await disconnect()
}
