using System.Collections.Generic;

namespace TodoApi.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public ICollection<TodoItem> TodoItems { get; set; } //Navigationproperty
    }    
}