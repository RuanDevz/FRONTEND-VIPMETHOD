import React, { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-black text-white p-2 rounded mt-4 hover:bg-gray-800 transition duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
