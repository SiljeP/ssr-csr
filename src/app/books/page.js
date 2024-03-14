import { connect, disconnect } from "@/lib/db"
import mongoose from "mongoose"

async function getBooks() {

    await connect()

    const books = await mongoose.connection.db.collection("books").find({}).toArray()

    await disconnect()

    return books
}

export default async function Books() {
    const books = await getBooks()
    console.log(books)
    return (
        <>
            <h1 className="text-3xl">Books</h1>
        </>
    )
}
