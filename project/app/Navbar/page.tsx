"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "../../public/asserts/logo.png";

interface NavLinksProps {
  text: string;
  toggleNavbar?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ text, toggleNavbar }) => {
  const handleClick = () => {
    if (toggleNavbar) {
      toggleNavbar();
    }
    const section = document.getElementById(text);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${text}`}
      className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm md:text-lg font-medium transition duration-300 ease-in-out"
      onClick={handleClick}
    >
      {text.charAt(0).toUpperCase() + text.slice(1)}
    </a>
  );
};

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignupClick = () => {
    window.location.href = "./Signup"; // Navigate to the signup page
  };
  const handleLoginClick = () => {
    window.location.href = "./Login"; // Navigate to the signup page
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-transparent">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image src={logo} alt="logo" width={100} height={30} />
      </div>

      <div className="hidden md:flex md:items-center md:w-auto pr-20 space-x-9">
        {["home", "Features", "about us", "contact us"].map((text) => (
          <NavLinks key={text} text={text} toggleNavbar={toggleNavbar} />
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleSignupClick}
        >
          Signup
        </button>
        <button
          className="bg-transparent text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
      <div className="md:hidden">
        <button
          onClick={toggleNavbar}
          className="text-white hover:text-blue-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-white" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-10 right-6 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col space-y-2 items-center">
            {["home", "Features", "about us", "contact us"].map((text) => (
              <NavLinks key={text} text={text} toggleNavbar={toggleNavbar} />
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out w-full"
              onClick={handleSignupClick}
            >
              Signup
            </button>
            <button
              className="bg-transparent text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out w-full"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
