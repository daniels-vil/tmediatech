import React, { useState } from 'react';
import createDevice from './libs/createDevice';

const CreateDeviceForm = () => {
  const [device, setDevice] = useState({
    id:null,
    name: '',
    model: '',
    messages: 0,
    maxMessages: 0,
    online: false,
    daysActive:null
  });

  const handleChange = (field:string, value:any) => {
    setDevice((prevDevice) => ({
      ...prevDevice,
      [field]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const result = await createDevice(device);

     console.log('Device created successfully:', result);

      setDevice({
        id:null,
        name: '',
        model: '',
        messages: 0,
        maxMessages: 0,
        online: false,
        daysActive:null
      });
    } catch (error) {
      console.error('Error creating device:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-[500px] justify-center ">
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">
      Name:
    </label>
    <input
      type="text"
      value={device.name}
      onChange={(e) => handleChange('name', e.target.value)}
      className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-blue-500"
      placeholder="Enter device name"
    />
  </div>

  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">
      Model:
    </label>
    <input
      type="text"
      value={device.model}
      onChange={(e) => handleChange('model', e.target.value)}
      className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-blue-500"
      placeholder="Enter device model"
    />
  </div>

  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700">
      Max Messages:
    </label>
    <input
      type="number"
      min="0"
      max="100"
      value={device.maxMessages}
      onChange={(e) => handleChange('maxMessages', parseInt(e.target.value, 10) || 0)}
      className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-blue-500"
      placeholder="Enter max messages (0-100)"
    />
  </div>

  <div className="flex justify-center space-x-2">
    <button
      type="submit"
      className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Create
    </button>
  </div>
</form>
  );
};

export default CreateDeviceForm;