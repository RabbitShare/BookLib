using System;

namespace Server.Excetpions
{
    public class BookAlreadyExistsException : Exception
    {
        public BookAlreadyExistsException(string msg) : base(msg) { }

        public BookAlreadyExistsException() : base("Книга уже существует") { }
    }
}
