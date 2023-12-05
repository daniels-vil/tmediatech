namespace WebAPI.Models
{
    public class DeviceModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Model { get; set; }
        public int? Messages { get; set; }
        public int? MaxMessages { get; set; }
        public bool? Online { get; set; }
        public DateTime? DaysActive { get; set; }
    }
}
