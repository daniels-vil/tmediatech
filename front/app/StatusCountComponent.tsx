import React from 'react'

const StatusCountComponent = ({status,count}:{status:string,count:number}) => {
  return (
    <div className={`flex items-center w-[120px] h-[48px] ${status !== "Online" ? "bg-[#3498db]" : "bg-white border-gray-300 border-[3px]"} p-4 rounded-lg`}>
  <p className={`${status === "Online" ? "text-black" : "text-white"} font-semibold`}>{status}</p>
  <div className="w-[24px] h-[24px] p-4 bg-[#d6d8e0] text-center flex items-center gap-[10px] justify-center ml-2 rounded-[5px]">
    <p className="text-black">{count}</p>
  </div>
</div>
  )
}

export default StatusCountComponent
