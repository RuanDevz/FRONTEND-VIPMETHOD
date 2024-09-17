import React, { ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  label?: string; // Propriedade opcional para a label
};

const Input: React.FC<InputProps> = ({ label, id, type = "text", ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}
      <input id={id} type={type} {...props} className="border border-gray-300 p-2 rounded w-full" />
    </div>
  );
};

export default Input;
