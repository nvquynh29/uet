import { Layout, Menu } from "antd";
import React from "react";
import Link from "next/link";
import { useState } from "react";

function NavigatorBar() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
      <nav>
        <div className="flex  z-50 shadow-lg w-full items-center flex-wrap bg-white p-3 transform transition duration-500 ease-in-out px-20">
          <Link href="/">
            <a className="inline-flex items-center p-2 mr-4 ">
              <img srcSet="/images/logo.png" alt="" />
            </a>
          </Link>
          <button
            className=" inline-flex p-3 hover:bg-red-500 rounded bg-red-500  text-black ml-auto hover:text-white outline-none transition duration-500 ease-in-out md:hidden "
            onClick={handleClick}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className={`${
              active ? "" : "hidden"
            }   w-full md:inline-flex md:flex-grow md:w-auto`}
          >
            <div className="md:inline md:flex-row md:ml-auto md:w-auto w-full md:items-center items-start  flex flex-col md:h-auto">
              <Link href="/">
                <a className="md:inline md:w-auto w-full px-3 py-2 rounded text-red-400 font-bold items-center justify-center hover:bg-red-500 hover:text-white ">
                  Home
                </a>
              </Link>
              <Link href="/">
                <a className="md:inline md:w-auto w-full px-3 py-2 rounded text-red-400 font-bold items-center justify-center hover:bg-red-500 hover:text-white">
                  Services
                </a>
              </Link>
              <Link href="/">
                <a className="md:inline md:w-auto w-full px-3 py-2 rounded text-red-400 font-bold items-center justify-center hover:bg-red-500 hover:text-white">
                  About us
                </a>
              </Link>
              <Link href="/">
                <a className="lg:inline lg:w-auto w-full px-3 py-2 rounded text-red-400 font-bold items-center justify-center hover:bg-red-500 hover:text-white">
                  Contact us
                </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavigatorBar;
