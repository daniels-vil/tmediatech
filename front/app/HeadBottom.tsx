import { usePathname } from "next/navigation";
import React from "react";

function HeadBottom() {
  const path = usePathname();
  const modifiedPath = path.slice(1);
  const finalPath =
    modifiedPath.charAt(0).toUpperCase() + modifiedPath.slice(1);

  return (
    <div>
      <div className="h-[80px] bg-[#181E34] text-white flex flex-col p-5">
        <div className="text-xl mb-2">Home/</div>
        <div className="text-3xl">{finalPath}</div>
      </div>
    </div>
  );
}

export default HeadBottom;
