import Head from "next/head";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image";
import Socials from "../components/social";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";


export default function Home() {

    const container = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 1,
                duration: 1
            }
        }
    };

    const [DescriptionAboutme, setDescriptionAboutme] = useState(false);
    const [Description, setDescription] = useState(false);

    useEffect(() => {
        fetch(  `${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/homes/1 `, {
            method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setDescriptionAboutme(data.data.attributes.DescriptionStory);
                setDescription(data.data.attributes.Description);
            })
    }, []);

    //create motion that comes from the right of the screen
    const container2 = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: 1,
                duration: 1
            }
        }
    };

    return (
        <div>
            <Head>
                <meta name="description" content="Home Page" />
                <title>Home Page</title>
            </Head>
            <Navbar />
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <motion.div initial="hidden"
                            animate="visible"
                            variants={container}  className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <div className="title">
                        <h1 className="fw-bold">Jeremy Forest</h1>
                        <h4 className="text-gray-600">Full Stack Developer</h4>
                        <Image
                            src="https://avatars.githubusercontent.com/u/53579676?v=4"
                            alt="Jeremy Forest"
                            width={200}
                            height={200}
                            className="rounded-full w-32 h-32"
                        />
                    </div>
                    <div className="text-3xl text-justify">
                        <p>
                            {Description}
                        </p>
                    </div>
                    <Socials/>
                    <div className="text-3xl">
                        <p>
                            <a href="mailto:ethylamide@icloud.com" className="text-blue-500">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Contact Me
                                </button>
                            </a>
                        </p>
                    </div>
                </motion.div>
                <motion.div initial="hidden"
                            animate="visible"
                            variants={container2}  className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <div className="title">
                        <h1 className="fw-bold">A little about my personal life</h1>
                        <h4 className="text-gray-600">My Story</h4>
                    </div>
                    <div className="text-3xl text-left">
                        <p>
                            {DescriptionAboutme}
                        </p>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}
