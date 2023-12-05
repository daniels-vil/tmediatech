"use client";
import { useState } from "react";
import CreateDeviceForm from "./DeviceForm";

export default function Home() {
  const [isFormVisible, setFormVisibility] = useState(false);

  const handleToggleForm = () => {
    console.log("Toggling form visibility");
    setFormVisibility(!isFormVisible);
  };
  return (
    <div className="grid justify-center">
      <div className="text-center justify-center flex mb-2 mt-2 font-bold">
        <h2>Testing purpose "Create device"</h2>
      </div>
      <button
        onClick={handleToggleForm}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
      >
        {isFormVisible ? "Hide Form" : "Show Form"}
      </button>

      {isFormVisible && <CreateDeviceForm />}
    </div>
  );
}
