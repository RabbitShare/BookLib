import React, { ChangeEventHandler, useState, FormEvent, useEffect } from 'react'

import Book from '../types/Book'


interface BookItemFormProps {
    bookBase: Book,
    handleBook: (book: Book) => void,
    resetBook?: () => void
}

const BookItemForm: React.SFC<BookItemFormProps> = ({ bookBase, handleBook, resetBook = () => { } }) => {
    const [book, setBook] = useState(bookBase)

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = event => {
        const { name, value } = event.target

        setBook({ ...book, [name]: +value || value })
    }

    const handleReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setBook(bookBase)
        resetBook()
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!book.name
            || !book.author
            || !book.genre
            || isNaN(book.year)) return

        handleBook(book)
        setBook(bookBase)
    }

    useEffect(
        () => {
            setBook(bookBase)
        },
        [bookBase]
    )

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className="form-container">
            <label>
                Автор:
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleInputChange}
                    required />
            </label>
            <label>
                Название:
                <input
                    type="text"
                    name="name"
                    value={book.name}
                    onChange={handleInputChange}
                    required />
            </label>
            <label>
                Жанр:
                <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    onChange={handleInputChange}
                    required />
            </label>
            <label>
                Год:
                <input
                    type="number"
                    name="year"
                    value={book.year}
                    onChange={handleInputChange}
                    required />
            </label>
            <input type="submit" value="Готово" />
            <input type="reset" value="Отмена" />
        </form>
    )
}

export default BookItemForm;

