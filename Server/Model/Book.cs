using System;

namespace Server.Model
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Author { get; set; }
        public string Name { get; set; }
        public int? Year { get; set; }
        public string Genre { get; set; }
    }
}
