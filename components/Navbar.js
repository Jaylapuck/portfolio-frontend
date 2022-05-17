import React from "react";
import ActiveLink from "./ActiveLink";

export default function Navbar() {

   return(
        <nav className=" shadow-sm w-full z-10">
            <div className="w-full">
                <div className="flex items-center h-20 w-full">
                    <div className="flex items-center  mx-20  justify-between w-full">
                        <div className="flex justify-center items-center flex-shrink-0 ">
                            <h1 className=" font-bold text-xl cursor-pointer">
                                Jeremy<span className="text-blue-500"> Forest</span>
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <ActiveLink href={"/"} passHref={true}>
                                    <a>
                                        Home
                                    </a>
                                </ActiveLink>

                                <ActiveLink href={"/about"} passHref={true}>
                                    <a>
                                        About
                                    </a>
                                </ActiveLink>
                                <ActiveLink href={"/projects"} passHref={true}>
                                    <a>
                                        Projects
                                    </a>
                                </ActiveLink>
                                <ActiveLink href={"/contact"} passHref={true}>
                                    <a>
                                        Contact
                                    </a>
                                </ActiveLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

