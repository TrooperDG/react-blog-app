import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-5 py-2 duration-75 hover:opacity-80 outline-1  active:outline-gray-500 rounded-lg ${className} ${bgColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
