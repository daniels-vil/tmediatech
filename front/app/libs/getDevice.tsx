import { urlGetDevice } from '../endpoints';

export default async function getDevice({deviceId}:{deviceId:number}) {
  const response = await fetch(`${urlGetDevice}/${deviceId}`,{
    cache:'no-cache',
  });
    if(!response.ok){
       throw new Error("Device not found!"); 
    }
    try {
        const deviceData = await response.json();
        
        return deviceData;

      } catch (error) {
        console.error('Error parsing JSON:', error);
        throw new Error('Error parsing JSON');
      }

}
