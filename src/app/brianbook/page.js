"use client"

import BookForm from "@/components/bookform"
import { cancelDeleteBook, getBooks } from "@/actions/books"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { createBook, deleteBook } from "@/actions/books"
import ReactConfirmPopup from 'react-confirm-popup';

export default function Books() {
    const [books, setBooks] = useState([])
    const [formState, formAction] = useFormState(createBook)


    async function deleteHandler(id) {
        // if (confirm("Are you sure you want to delete this book?")){} //den nemme metode der bruges browserens indbyggede 

        await deleteBook(id)
        setBooks(await getBooks())

    }

    useEffect(function () {
        getBooks().then(books => setBooks(books))
    }, [formState])


    return (
        <>
            <h1 className="text-3xl">Books</h1>
            <BookForm formAction={formAction} formState={formState} />
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        {book.title} by {book.author}
                        <ReactConfirmPopup
                            trigger={<button
                                className="bg-red-500 text-white font-semibold uppercase px-2 py-1 rounded-full">
                                Delete
                            </button>}
                            title={<h1 className="text-black font-semibold">
                                Are you sure you want to delete?
                            </h1>}
                            text={
                                <div className="text-black">
                                    Are you sure you should delete this book permanently?
                                </div>
                            }
                            confirmText="Yes! I'm sure"
                            cancelText="Nope, nevermind"
                            onConfirmClicked={() => deleteHandler(book._id)}
                        />





                    </li>
                ))}
            </ul>
        </>
    )
}
