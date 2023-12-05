import { DeviceType } from '../interfaces/deviceType'
import { urlUpdateDevice } from '../endpoints';

const updateDevice = async (device: DeviceType | null) => {
    if (!device) {
      console.error('No device selected for update');
      return;
    }

    try {
      const response = await fetch(`${urlUpdateDevice}/${device.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: device.name,
          model: device.model,
          maxMessages: device.maxMessages,
          online: device.online,
        }),
      });

      if (response.ok) {
        console.log(`Device with ID ${device.id} updated successfully!`);
        window.location.reload();
      } else {
        console.error(`Failed to update device. Server returned status ${response.status}`);
      }
    } catch (error) {
      console.error('Error during device update:', error);
    }
  };

  export default updateDevice;