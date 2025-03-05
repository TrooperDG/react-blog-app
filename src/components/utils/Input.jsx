import React, { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const id = useId();
  return (
    <div className={"w-full "}>
      {label && (
        <label className="block mb-1 text-gray-600 font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      />
    </div>
  );
}

export default Input;
