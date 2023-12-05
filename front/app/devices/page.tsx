"use client";
import React, { useEffect, useState } from "react";
import { DeviceType } from "../interfaces/deviceType";
import getDeviceList from "../libs/getDeviceList";
import DeviceTable from "../DevicesTable";

export default function Page() {
  const [devices, setDevices] = useState<DeviceType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesData: DeviceType[] = await getDeviceList();

        if (Array.isArray(devicesData)) {
          setDevices(devicesData);
        } else {
          console.error("Invalid data received from getDeviceList");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  return (
    <div className="mb-4 h-[40px] bg-[#181E34] w-full m-0 p-0">
      <div className="container mx-auto max-w-screen-xl">
        <div className="mb-4">
          <div className="flex justify-center p-4 bg-gray-200 rounded-lg">
            <div className="rounded-lg shadow-xl w-[100%]">
              <DeviceTable
                devices={devices}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
