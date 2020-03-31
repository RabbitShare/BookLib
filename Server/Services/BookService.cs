using Server.Excetpions;
using Server.Model;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;

namespace Server.Services
{
    public class BookService
    {
        private readonly string _connectionString;

        public BookService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<Book> GetBooks()
        {
            using var context = new DatabaseContext(_connectionString);
            return context.Books.ToArray();
        }

        public Book GetBook(Guid id)
        {
            using var context = new DatabaseContext(_connectionString);
            return context.Books.FirstOrDefault(b => b.Id == id);
        }

        public Book CreateBook(Book book)
        {
            if (string.IsNullOrEmpty(book.Name))
                throw new ArgumentException("Название книги не указано");
            if (string.IsNullOrEmpty(book.Author))
                throw new ArgumentException("Автор книги не указан");
            if (book.Year == null)
                throw new ArgumentException("Год книги не указан");
            if (string.IsNullOrEmpty(book.Genre))
                throw new ArgumentException("Жанр книги не указан");

            using var context = new DatabaseContext(_connectionString);

            var existedBook = context.Books.FirstOrDefault(b =>
                b.Author.ToUpper() == book.Author.ToUpper()
                && b.Name.ToUpper() == book.Name.ToUpper());

            if (existedBook != null)
                throw new BookAlreadyExistsException();

            context.Books.Add(book);
            context.SaveChanges();
            return book;
        }

        public void UpdateBook(Book book)
        {
            if (string.IsNullOrEmpty(book.Name))
                throw new ArgumentException("Название книги не указано");
            if (string.IsNullOrEmpty(book.Author))
                throw new ArgumentException("Автор книги не указан");
            if (book.Year == null)
                throw new ArgumentException("Год книги не указан");
            if (string.IsNullOrEmpty(book.Genre))
                throw new ArgumentException("Жанр книги не указан");

            using var context = new DatabaseContext(_connectionString);
            context.Entry(book).State = EntityState.Modified;

            context.SaveChanges();
        }

        internal void DeleteBook(Guid id)
        {
            using var context = new DatabaseContext(_connectionString);
            var book = context.Books.FirstOrDefault(b => b.Id == id);

            if (book == null)
                throw new BookIsNotExistsException();

            context.Books.Remove(book);
            context.SaveChanges();
        }
    }
}
