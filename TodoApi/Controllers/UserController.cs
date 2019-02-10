using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using TodoApi.Services;
using Microsoft.AspNetCore.Cors;

namespace TodoApi.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TodoContext _context;

        public UserController(TodoContext context)
        {
            _context = context;
        }

        //GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            users.ForEach(u => u.PasswordHash = null);
            return users;
        }

        //GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(long id)
        {
            var user = await _context.Users
                            .Include(u => u.TodoItems) // Tells the EF to load the todo items as well
                            .FirstOrDefaultAsync(u => u.Id == id); // Searches for the first occurence, if no matching item is found, null is returned

            if (user == null)
            {
                return NotFound();
            }

            user.PasswordHash = null;

            return user;
        }

        //POST: api/user
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.PasswordHash = SecurityService.HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            user.PasswordHash = null;
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        //PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> PutTodoItem(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                if(user.PasswordHash != null)
                {
                    user.PasswordHash = SecurityService.HashPassword(user.PasswordHash);
                }
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return NotFound();
            }
            return NoContent();
        }

        //DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodoItem(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(User user)
        {
            var usr = await _context.Users.FindAsync(user.Id);

            if(usr == null)
            {
                return BadRequest();
            }

            var inputPasswordHash = SecurityService.HashPassword(user.PasswordHash);
            if(SecurityService.Authenticate(inputPasswordHash, usr.PasswordHash)) return Ok();

            return BadRequest();
        }
    }
}