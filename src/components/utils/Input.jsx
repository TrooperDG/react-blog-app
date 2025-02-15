import React, { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const ID = useId();
  return (
    <div className={"w-full "}>
      {label && (
        <label className="block mb-1" htmlFor={ID}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
      />
    </div>
  );
}

export default Input;
