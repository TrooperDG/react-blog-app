import React from "react";

function Logo({ width = "w-10" }) {
  return (
    <div className={`text-white ${width}`}>
      <img
        className="w-full rounded-sm"
        src="/src/assets/bs2.webp"
        alt="BlogStore"
      />
    </div>
  );
}

export default Logo;
