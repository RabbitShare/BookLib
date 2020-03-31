import Guid from './Guid'

export default interface Book {
    id: Guid,
    author: string,
    name: string,
    year: number,
    genre: string
}

export const initialBook: Book = { year: 0, genre: '', author: '', id: Guid.empty, name: '' }

