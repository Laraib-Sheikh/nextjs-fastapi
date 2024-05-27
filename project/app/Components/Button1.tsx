import React from "react";

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <button className="w-full h-14 px-2.5 py-3.5 bg-gradient-to-r from-pink-600 via-pink-800 to-pink-950 rounded-xl flex justify-center items-center text-white text-xl font-semibold font-['Noto_Sans']">
      {title}
    </button>
  );
};

export default Button;
