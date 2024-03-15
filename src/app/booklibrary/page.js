import { connect, disconnect } from "@/lib/db"
import books from "@/models/books"


async function getBooks() {
    await connect()
    //Finder alle bøger i databasen
    const book = await books.find()

    await disconnect()

    return book
}
export default async function BookLibrary() {
    const books = await getBooks()

    return (
        <>
            <div className="flex justify-center flex-col items-center">
                <h1 className="text-3xl p-3">The Library</h1>
                <h2 className="text-xl p-3">All books</h2>
                <ul className="text-center">
                    {books.map(book =>
                        <li className="p-2" key={book._id}>{book.title} by {book.author} has {book.pages} pages.</li>
                    )}
                </ul>

            </div>

        </>

    )

}