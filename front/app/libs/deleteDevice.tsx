import { urlDeleteDevice } from '../endpoints';

export default async function deleteDevice(deviceId:number|null) {
    try {
        const response = await fetch(`${urlDeleteDevice}/${deviceId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          console.log(`Device with ID ${deviceId} deleted successfully!`);

          window.location.reload();
        } else {
          console.error('Failed to delete device:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting device:', error);
      }
}

