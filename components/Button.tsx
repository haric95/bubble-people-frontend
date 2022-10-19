import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  const className = props.className;
  return (
    <button
      {...props}
      className={`transition-all transition-duration-100 bg-button hover:bg-buttondark py-2 px-4 ${props.className}`}
    ></button>
  );
};
