import React, { Component } from 'react'

import BookService from './services/BookService'
import Book from './types/Book'
import EditBookItem from './components/EditBookItem'
import AddBookItem from './components/AddBookItem'
import Guid from './types/Guid'
import BookList from './components/BookList'

import './App.css'


interface AppProps {

}

interface AppState {
    books: Book[],
    currentBook: Book | null,
    editing: boolean,
    loading: boolean
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            loading: false,
            books: [],
            editing: false,
            currentBook: null
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            const books = await BookService.getBooks()
            this.setState({ books, loading: false })
        } catch (e) {
            alert(e.message)
            this.setState({ books: [], loading: false })
        }

    }

    componentWillUnmount() {
        this.setState({ loading: false })
    }

    setEditing(editing: boolean) {
        this.setState({ editing })
    }

    async editBook(id: Guid) {
        const currentBook = await BookService.getBook(id)
        this.setState({ editing: true, currentBook })
    }

    async deleteBooks(ids: Guid[]) {
        try {
            for (const id of ids)
                await BookService.deleteBook(id)

            const books = this.state.books.filter(b => !ids.includes(b.id))

            this.setState({ editing: false, books })
        } catch (e) {
            alert(e.message)
        }
    }

    async addBook(newBook: Book) {
        try {
            const book = await BookService.createBook(newBook)

            const books = [...this.state.books, book]

            this.setState({ books })
        } catch (e) {
            alert(e.message)
        }

    }

    async updateBook(updatedBook: Book) {
        try {
            if (JSON.stringify(updatedBook) === JSON.stringify(this.state.currentBook)) {
                this.setState({ editing: false })
                return
            }

            await BookService.updateBook(updatedBook)

            const books = this.state.books.map((book: Book) =>
                (book.id === updatedBook.id ? updatedBook : book))

            this.setState({ editing: false, books })
        } catch (e) {
            alert(e)
            this.setState({ editing: false })
        }
    }

    render() {
        const { loading, books, editing, currentBook } = this.state

        if (loading)
            return <p>Загрузка ...</p>

        const actionBlock = editing ?
            <div>
                <h2>Режим редактирования</h2>
                <EditBookItem
                    currentBook={currentBook as Book}
                    updateBook={this.updateBook.bind(this)}
                    setEditing={this.setEditing.bind(this)}
                />
            </div>
            :
            <div>
                <h2>Режим добавления</h2>
                <AddBookItem addBook={this.addBook.bind(this)} />
            </div>

        return (
            <>
                <h1>Библиотека</h1>
                <div className="container">
                    {actionBlock}
                    {books.length > 0 ?
                        <BookList
                            books={books}
                            deleteBooks={this.deleteBooks.bind(this)}
                            editBook={this.editBook.bind(this)} />
                        : <p> Книг нет, но вы можете их добавить </p>
                    }
                </div>
            </>
        )
    }
}

export default App

