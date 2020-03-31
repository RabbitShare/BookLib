import React from 'react'

import Book from '../types/Book'


interface BookItemProps {
    book: Book
}

const BookItem: React.SFC<BookItemProps> = ({ book }) => {
    return (
        <>
            <p>Автор: {book.author}</p>
            <p>Название: {book.name}</p>
            <p>Год: {book.year}</p>
            <p>Жанр: {book.genre}</p>
        </>
    )
}

export default BookItem

