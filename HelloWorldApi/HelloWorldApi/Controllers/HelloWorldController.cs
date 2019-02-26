using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HelloWorldApi.Models;

namespace HelloWorldApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloWorldController : ControllerBase
    {

        private readonly ListContext _context;

        public HelloWorldController(ListContext context)
        {
            _context = context;

            if (_context.ListItems.Count() == 0)
            {
                // Create a new ListItem if collection is empty,
                // which means you can't delete all ListItems.
                _context.ListItems.Add(new ListItem { Text = "Hello World!" });
                _context.SaveChanges();
            }
        }

        // GET: api/helloworld
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListItem>>> GetListItems()
        {
            return await _context.ListItems.ToListAsync();
        }

        // GET: api/helloworld/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListItem>> GetListItem(long id)
        {
            var listItem = await _context.ListItems.FindAsync(id);

            if (listItem == null)
            {
                return NotFound();
            }

            return listItem;
        }

        // POST: api/helloworld
        [HttpPost]
        public async Task<ActionResult<ListItem>> PostListItem(ListItem item)
        {
            _context.ListItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetListItem), new { id = item.Id }, item);
        }

        // PUT: api/helloworld/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListItem(long id, ListItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/helloworld/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListItem(long id)
        {
            var listItem = await _context.ListItems.FindAsync(id);

            if (listItem == null)
            {
                return NotFound();
            }

            _context.ListItems.Remove(listItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
