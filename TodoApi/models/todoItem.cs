namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; } // Prop --> tab

        public string Name { get; set; }

        public bool isComplete { get; set; } //Naming boolean: starts with "Is", "Has" or "Can"
        public string TextBox { get; set; }
        public string expiryDate { get; set; }
        public User User { get; set; }
    }
}