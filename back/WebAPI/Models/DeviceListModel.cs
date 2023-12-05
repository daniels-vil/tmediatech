namespace WebAPI.Models
{
    public class DeviceListModel
    {
        public DeviceListModel() 
        { 
            DeviceItems = new List<DeviceModel>();
        }

        public List<DeviceModel> DeviceItems { get; set; }
    }
}
