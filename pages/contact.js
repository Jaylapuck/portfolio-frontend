import Head from "next/head";
import Navbar from "../components/Navbar";
import ProIco from "../public/pro.ico";
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from "react";
import Image from "next/image";
import {
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton
} from "next-share";
import Aboutme from "../components/Aboutme";

export default function Contact(){

    return(
        <div>
            <Head>
                <title>Contact</title>
                <link rel="icon" href={ProIco} />
            </Head>
            <Navbar />
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <div>
                    <h1 className="text-5xl font-bold">Contact</h1>
                    <p className="text-xl">
                        If you have any questions or opportunities, feel free to contact me.
                    </p>
                    <div className="text-3xl">
                        <p>
                            <a href="mailto:ethylamide@icloud.com" className="text-blue-500">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Contact Me
                                </button>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}