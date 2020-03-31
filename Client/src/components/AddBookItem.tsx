import React from 'react'

import Book, { initialBook } from '../types/Book'
import BookItemForm from './BookItemForm'


interface AddBookItemProps {
    addBook: (book: Book) => Promise<void>
}

const AddBookItem: React.SFC<AddBookItemProps> = ({ addBook }) => {
    return (
        <BookItemForm
            bookBase={initialBook}
            handleBook={addBook} />
    )
}

export default AddBookItem

