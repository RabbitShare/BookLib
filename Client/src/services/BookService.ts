import Book from '../types/Book'
import Guid from '../types/Guid'

console.log(process.env)
const bookHost = 'https://localhost:40005/api/book'
const headers = new Headers()
headers.append("Content-Type", "application/json")

export default {
    async getBooks(): Promise<Book[]> {
        const resp = await fetch(`${bookHost}`)
        const res = await resp.json()
        if (!resp.ok)
            throw new Error(res.error)

        return res
    },

    async getBook(id: Guid): Promise<Book> {
        const resp = await fetch(`${bookHost}/${id.toString()}`)
        const res = await resp.json()
        if (!resp.ok)
            throw new Error(res.error)

        return res
    },

    async createBook(book: Book): Promise<Book> {
        const raw = JSON.stringify(book)

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw
        }

        const resp = await fetch(bookHost, requestOptions)
        const res = await resp.json()
        if (!resp.ok)
            throw new Error(res.error)
        
        return res
    },

    async updateBook(book: Book): Promise<void> {
        const raw = JSON.stringify(book)

        const requestOptions = {
            method: 'PUT',
            headers: headers,
            body: raw
        }

        const resp = await fetch(bookHost, requestOptions)
        if (!resp.ok) {
            const err = await resp.json()
            throw new Error(err.error)
        }
    },

    async deleteBook(id: Guid): Promise<void> {
        const resp = await fetch(`${bookHost}/${id}`, { method: 'DELETE' })
        if (!resp.ok) {
            const err = await resp.json()
            throw new Error(err.error)
        }
    }
}