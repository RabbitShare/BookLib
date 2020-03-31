using Server.Excetpions;
using Server.Model;
using Server.Services;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Linq;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _service;
        private readonly ILogger _logger;

        public BookController(BookService service, ILogger<BookController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var books = _service.GetBooks();
                if (!books.Any())
                {
                    _logger.LogError("Ошибка получения списка книг. Книги не найдены");

                    return NotFound(books);
                }

                return new JsonResult(books);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка получения списка книг");

                return StatusCode(500, new { Error = "Ошибка получения списка книг: " + ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var book = _service.GetBook(id);
                if (book == null)
                {
                    _logger.LogError("Ошибка получения книги. Книга не найдена");

                    return NotFound();
                }
                return new JsonResult(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка получения книги");

                return StatusCode(500, new { Error = "Ошибка получения книги: " + ex.Message });
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Book book)
        {
            try
            {
                var newBook = _service.CreateBook(book);

                return new JsonResult(book);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка создания книги");

                return StatusCode(500, new { Error = "Ошибка создания книги: " + ex.Message });
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] Book book)
        {
            try
            {
                _service.UpdateBook(book);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка обновления книги");

                return StatusCode(500, new { Error = "Ошибка обновления книги: " + ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _service.DeleteBook(id);

                return Ok();
            }
            catch (BookIsNotExistsException ex)
            {
                _logger.LogError(ex, "Ошибка удаления книги");

                return StatusCode(500, new { Error = "Ошибка удаления книги: " + ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка удаления книги");

                return StatusCode(500, new { Error = "Ошибка удаления книги: " + ex.Message });
            }
        }
    }
}
