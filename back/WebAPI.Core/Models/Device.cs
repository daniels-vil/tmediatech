namespace WebAPI.Core.Models
{
    public class Device : Entity
    {
        public string? Name { get; set; }
        public string? Model { get; set; }
        public int? Messages {  get; set; }
        public int? MaxMessages { get; set; }
        public bool? Online { get; set; }
        public DateTime? DaysActive {  get; set; }
    }
}
