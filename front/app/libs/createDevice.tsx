import { DeviceType } from '../interfaces/deviceType'
import { urlCreateDevice } from '../endpoints';

export default async function createDevice(device:DeviceType) {
    const createDeviceEndpoint = `${urlCreateDevice}`;
    try {
        const response = await fetch(createDeviceEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: device.name,
            Model: device.model,
            Messages: device.messages,
            MaxMessages: device.maxMessages,
            Online: device.online,
          }),
        });
    
        if (!response.ok) {
          throw new Error('Error creating device');
        }
    
        const result = await response.json();
        console.log(result); 
        return result; 
      } catch (error) {
        console.error('Error creating device:');
      }
    };


