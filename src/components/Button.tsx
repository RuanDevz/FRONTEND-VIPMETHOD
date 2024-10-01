import React, { ComponentPropsWithRef } from "react";
import './button.css'

type ButtonProps = ComponentPropsWithRef<"button">;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button id="b" className="p-3 w-full" {...props}>{children}</button>;
};

export default Button;
