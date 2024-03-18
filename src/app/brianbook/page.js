"use client"

import BookForm from "@/components/bookform"
import { cancelDeleteBook, getBook, getBooks } from "@/actions/books"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import { createBook, deleteBook } from "@/actions/books"
import ReactConfirmPopup from 'react-confirm-popup';

export default function Books() {
    const [books, setBooks] = useState([])
    const [book, setBook] = useState({})
    const [formState, formAction] = useFormState(createBook)

    const dialogRef = useRef(null)

    async function editHandler(event) {
        setBook(await getBook(event.target.dataset.id))
        dialogRef.current.showModal()
    }

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
                        <button
                            data-id={book._id}
                            onClick={editHandler}
                            className="bg-blue-500 text-white font-semibold uppercase px-2 py-1 rounded-full">
                            Edit
                        </button>

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
            <dialog ref={dialogRef} className="h-[14rem] w-[20rem] py-4 px-6 rounded-md backdrop:bg-white backdrop:bg-opacity-55">
                <h3>Edit the book</h3>
                <BookForm data={book} />
                <button onClick={() => dialogRef.current.close()}>Cancel</button>
            </dialog>
        </>
    )
}
