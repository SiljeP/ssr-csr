"use client"

// import { connect, disconnect } from "@/lib/db"
import { useFormState } from "react-dom"
// import Book from "@/models/books"
import Input from "@/components/input"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"
import { addBook } from "@/actions/addBook"
import BookForm from "@/components/bookform"

// function getBooks() {
//     //     connect()
//     //     //Finder alle bøger i databasen
//     //     // const books = Book.find()
//     //     //Sorterer på database niveau. Det er case sensitive, men finder altså alle bøger med samme forfatter.
//     //     // const books = await mongoose.connection.db.collection("books").find({ author: "Brandon Sanderson" }).toArray()
//     //     //kan også bruge findOne i stedet for find, hvor den tager den første den støder på. Så skal der heller ikke bruges toArray, og man kan ikke map det.

//     //     //Der er også findById("string med ID nummer"). Finder kun én. intet array
//     //     // const newBook = new Book({
//     //     //     title: "Kadavermarch",
//     //     //     author: "Dennis Jürgensen"
//     //     // })
//     //     // newBook.save()


//     disconnect()

//     //     return books
// }

export default function Books() {
    // const books = getBooks()

    const [formState, formAction] = useFormState(addBook)

    useEffect(function () {
        if (formState?.redirect) {
            redirect(formState.redirect)
        }

        if (!formState?.success) {
            toast.error(formState?._error)
        }

    }, [formState])

    return (
        <>
            {/* <h1 className="text-3xl">Books</h1>
            <ul>
                {books.map(book =>
                    <li key={book._id}>{book.title} by {book.author} has {book.pages} pages.</li>
                )}
            </ul> */}

            <h1 className="text-3xl p-2 ml-4">Books</h1>

            <form className="w-dvw mx-auto px-4 sm:w-1/2 md:w-1/3 lg:w-1/4" action={formAction} noValidate>
                <p className="text-xl">Add a book to the library</p>
                <Input label="Title" name="title" type="text" statusMessage={formState?.title?._errors[0]} />
                <Input label="Author" name="author" type="text" statusMessage={formState?.author?._errors[0]} />
                <Input label="Pages" name="pages" type="number" statusMessage={formState?.pages?._errors[0]} />

                <button
                    type="submit"
                    className="bg-orange-500 px-4 py-2 rounded-md w-full uppercase font-bold"
                >
                    Add book
                </button>
            </form>


        </>
    )
}
