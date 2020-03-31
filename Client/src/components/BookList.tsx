import React, { useState } from 'react'

import Book from '../types/Book'
import BookItem from './BookItem'
import Guid from '../types/Guid'


interface BookListProps {
    books: Book[],
    deleteBooks: (ids: Guid[]) => void,
    editBook: (id: Guid) => void
}

const BookList: React.SFC<BookListProps> = ({ books, deleteBooks, editBook }) => {
    const initialEditing = new Array<Guid>()

    const [editing, setEditing] = useState(initialEditing)

    const handleChange = (id: Guid) => {
        if (editing.includes(id))
            setEditing(editing.filter(e => e !== id))
        else
            setEditing([...editing, id])
    }

    const handleDeleteBooks = () => {
        deleteBooks(editing)
        setEditing(initialEditing)
    }

    return (
        <>
            <button onClick={handleDeleteBooks}>
                Удалить {editing.length > 0 ? editing.length : ''}
            </button>
            <div className="list-container">
                {books.map(book => (
                    <div key={book.id.toString()}>
                        <BookItem book={book} />
                        <button onClick={() => editBook(book.id)}>Редактировать</button>
                        <label>
                            <input type="checkbox" onChange={() => handleChange(book.id)} />
                            В корзину
                        </label>
                    </div>
                ))}
                </div>
            </>
    )
}

export default BookList

