import React from "react";

function Logo({ width = "w-10", rounded = "rounded-sm" }) {
  return (
    <div className={`text-white ${width}`}>
      <img
        className={`w-full  ${rounded}`}
        src="/images/logo.webp"
        alt="BlogStore"
      />
    </div>
  );
}

export default Logo;
