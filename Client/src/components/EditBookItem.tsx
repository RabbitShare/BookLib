import React from 'react'

import Book from '../types/Book'
import BookItemForm from './BookItemForm'


interface EditBookItemProps {
    currentBook: Book,
    updateBook: (book: Book) => Promise<void>,
    setEditing: (editing: boolean) => void
}

const EditBookItem: React.SFC<EditBookItemProps> = ({ currentBook, updateBook, setEditing }) => {
    const resetBook = () => {
        setEditing(false)
    }

    return (
        <BookItemForm
            bookBase={currentBook}
            handleBook={updateBook}
            resetBook={resetBook}/>
    )
}

export default EditBookItem

