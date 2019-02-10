using Microsoft.EntityFrameworkCore; //ORM

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {

        }

        // Represents the data rows in the table
        public DbSet<TodoItem> TodoItems { get; set; } //Naming : DBSets must be Plural

        public DbSet<User> Users { get; set; }
    }
}