import { urlDeviceList } from '../endpoints';

export default async function getDeviceList() {
    const response = await fetch(`${urlDeviceList}`, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('No devices available');
  }

  try {
    const data = await response.json();
    const devices = data.deviceItems;

    if (!Array.isArray(devices)) {
      throw new Error('Invalid data received from getDeviceList');
    }
    return devices;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Error parsing JSON');
  }
}
