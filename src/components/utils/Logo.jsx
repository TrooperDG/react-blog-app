import React from "react";
import logo from "../../assets/logo.webp";

function Logo({ width = "w-10" }) {
  return (
    <div className={`text-white ${width}`}>
      <img className="w-full rounded-sm" src={logo} alt="BlogStore" />
    </div>
  );
}

export default Logo;
