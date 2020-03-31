using System;

namespace Server.Excetpions
{
    public class BookIsNotExistsException : Exception
    {
        public BookIsNotExistsException(string msg) : base(msg) { }

        public BookIsNotExistsException() : base("Книга не существует") { }
    }
}
