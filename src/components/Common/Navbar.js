import { useState } from "react";
import { FaSignInAlt, FaKey, FaUser, FaSignOutAlt, FaCog, FaDownload } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/router";
import { BiLogInCircle } from "react-icons/bi";
import { signIn } from 'next-auth/react';


export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="backdrop-blur-sm shadow md:flex md:items-center md:justify-between fixed w-full top-0 z-10">
            <div className="flex justify-between items-center">
                <div onClick={() => router.push("/")} className="flex items-center gap-x-3 cursor-pointer md:ml-5">
                    <img src="/logos/main_logo.svg" width={150} alt="Logo" />
                </div>

                <span className="text-3xl cursor-pointer mx-3 mr-5 md:hidden block" onClick={toggleMenu}>
                    <IoMenu />
                </span>
            </div>

            <ul
            className={`md:flex md:items-center md:static md:backdrop-blur-sm absolute  w-full left-0 md:w-auto md:py-0 py-4 md:mr-10 md:pl-0 py-2  ${isMenuOpen ? "opacity-100 z-10 right bg-white flex flex-col items-center justify-center " : "opacity-100 top-[-400px]"
                } `}
        >
                <li className="mx-3 my-2 md:m-3">
                    <a href="/" className="text-gray-500 hover:text-blue-500 transition-all duration-700 font-medium">
                        Home
                    </a>
                </li>
                <li className="mx-3 my-2 md:m-3">
                    <a href="/partners" className="text-gray-500 hover:text-blue-500 transition-all duration-700 font-medium">
                        Partners
                    </a>
                </li>
                <li className="mx-3 my-2 md:m-3">
                    <a href="/aboutus" className="text-gray-500 hover:text-blue-500 transition-all duration-700 font-medium">
                        About Us
                    </a>
                </li>
                <li className="mx-3 my-2 md:m-3">
                    <a href="/download" className="text-gray-500 hover:text-blue-500   transition-all duration-700 font-medium ">
                        Download <FaDownload className="inline-block align-text-bottom ml-2 mb-1" />
                    </a>
                </li>
                <li className="mx-3 my-2 md:m-3 backdrop-blur-sm">
                    <button type="button" className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 font-medium transition-all duration-700" 
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/dashboard/home");
                        }}>
                    <BiLogInCircle className="inline-block" />
    
                    <span className="font-2xl">Get Started</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
