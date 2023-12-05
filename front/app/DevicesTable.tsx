import React, { useState } from "react";
import { DeviceType } from "./interfaces/deviceType";
import deleteDevice from "./libs/deleteDevice";
import updateDevice from "./libs/updateDevice";
import StatusCountComponent from "./StatusCountComponent";

function DevicesTable({ devices }: { devices: DeviceType[] }) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);

  const [enableConnection, setEnableConnection] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleDelete = (deviceId: number | null) => {
    deleteDevice(deviceId);
    console.log(`Deleting device with ID: ${deviceId}`);
  };

  const handleEdit = (device: DeviceType) => {
    setSelectedDevice(device);
  };

  const handleControl = (device: DeviceType) => {
    setEnableConnection(true);
    setSelectedDevice(device);
  };

  const onlineDevices = devices.filter((device) => device.online);
  const offlineDevices = devices.filter((device) => !device.online);

  const filteredDevices = devices.filter((device) =>
    device.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleUpdate = () => {
    console.log(`Updating device:`, selectedDevice);
    updateDevice(selectedDevice);
    setSelectedDevice(null);
    if (enableConnection) {
      setEnableConnection(false);
    }
  };
  function calculateDaysActive(startDate: Date | null) {
    const daysActive = Math.floor(
      (Date.now() - new Date(startDate ?? Date.now()).getTime()) /
        (24 * 60 * 60 * 1000)
    );

    return daysActive;
  }

  return (
    <div className="container rounded-lg max-w-screen-xl mx-auto p-4 bg-white border border-solid border-[#26337326]">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-auto gap-4 items-center">
          <StatusCountComponent status="Online" count={onlineDevices.length} />
          <StatusCountComponent
            status="Offline"
            count={offlineDevices.length}
          />
          <div className="flex-grow"></div>
          <div className="flex-shrink-0 w-48">
            <div className="relative">
              <input
                type="text"
                placeholder="Quick search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-2 border rounded w-full"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-5-5m2-5a7 7 0 10-14 0 7 7 0 0014 0zM11 14H5"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="group from-white via-white to-white,
            bg-gradient-to-r from-#D6D8E0 to-#D6D8E0 border hover:bg-gray-100 transition duration-300 p-4 rounded grid grid-cols-4"
          >
            <div className="flex items-center">
              {device.online ? (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              ) : (
                <div className="w-3 h-3 bg-[#b8143d] rounded-full"></div>
              )}
              <div className="pl-6">
                <p className="font-bold text-lg">{device.name}</p>
                <p className="text-slate-500">{`Connection: ${
                  device.online ? "100%" : "0%"
                }`}</p>
              </div>
            </div>
            <div className="mb-2 text-center">
              <p className="text-slate-500">Model</p>
              <p className="font-bold text-lg">{device.model}</p>
            </div>
            <div className="mb-2 text-center">
              <p className="text-slate-500">Con-stat</p>
              {device.messages}/{device.maxMessages} messages over{" "}
              {calculateDaysActive(device.daysActive)} day(s)
            </div>
            <div className="text-center opacity-0 transition-opacity duration-300 group-hover:opacity-[100%] space-x-4">
              <button
                onClick={() => handleEdit(device)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500 transition duration-300"
              >
                Settings
              </button>
              <button
                onClick={() => handleControl(device)}
                className="px-4 py-2  bg-gray-300 text-black rounded hover:bg-gray-500 transition duration-300"
              >
                Control
              </button>
            </div>
          </div>
        ))}
        <div>
          {enableConnection && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-30">
              <div className="bg-white w-[300px] p-6 rounded-lg shadow-md relative z-10">
                <h2 className="text-xl font-bold mb-4">Device Connection</h2>
                <div className="mb-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDevice?.online ?? false}
                      onChange={(e) =>
                        setSelectedDevice((prevDevice) => ({
                          ...prevDevice!,
                          online: e.target.checked,
                        }))
                      }
                      className="hidden"
                    />
                    <div
                      className={`w-12 h-6 rounded-full ${
                        selectedDevice?.online ? "bg-green-500" : "bg-gray-400"
                      } relative transition-all duration-300`}
                    >
                      <div
                        className={`dot w-6 h-6 rounded-full bg-white shadow-md absolute top-0 ${
                          selectedDevice?.online ? "left-6" : "left-0"
                        } transition-all duration-300`}
                      ></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium">
                      {selectedDevice?.online ? `Online` : `Offline`}
                    </div>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Update Connection
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEnableConnection(false);
                      setSelectedDevice(null);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {selectedDevice && !enableConnection && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-30">
              <div className="bg-white w-[300px] p-6 rounded-lg shadow-md relative z-10">
                <h2 className="text-xl font-bold mb-4">{`Edit ${selectedDevice.name}`}</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      value={selectedDevice.name ?? ""}
                      onChange={(e) =>
                        setSelectedDevice({
                          ...selectedDevice,
                          name: e.target.value,
                        })
                      }
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Model:
                    </label>
                    <input
                      type="text"
                      value={selectedDevice.model ?? ""}
                      onChange={(e) =>
                        setSelectedDevice({
                          ...selectedDevice,
                          model: e.target.value,
                        })
                      }
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Max Messages:
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      minLength={1}
                      value={selectedDevice.maxMessages ?? 0}
                      onChange={(e) =>
                        setSelectedDevice({
                          ...selectedDevice,
                          maxMessages: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="flex-grow bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDevice(null)}
                      className="flex-grow bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DevicesTable;
