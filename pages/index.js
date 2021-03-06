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
    const divStyle = {
        backgroundColor: '#b3b3b3',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px #000000'
    };

    const buttonStyle = {
        backgroundColor: '#4d00ff',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px #000000'
    };


    const [DescriptionAboutme, setDescriptionAboutme] = useState(false);
    const [Description, setDescription] = useState(false);
    const [ProfilePic, setProfilePic] = useState("");

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
                setProfilePic(data.data.attributes.LinkProfilePic);
            })
    }, []);

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
                            style={divStyle}
                            variants={container}  className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <div className="title">
                        <h1 className="fw-bold">Jeremy Forest</h1>
                        <h4 className="text-gray-600">Full Stack Developer</h4>
                        {ProfilePic === "" ?
                            <Image className="img-fluid img-fluid rounded-pill" src="/images/profile.jpg" alt="profile" width={250} height={250}/>
                            :
                            <Image className="img-fluid img-fluid rounded-pill" src={ProfilePic} alt="profile" width={250} height={250}/>
                        }
                    </div>
                    <div className="text-3xl text-justify">
                        <p>
                            {Description}
                            {DescriptionAboutme}
                        </p>
                    </div>
                    <div className="text-3xl">
                        <div className="row">
                            <a href="mailto:jeremy_forest201@gmail.com" className="text-blue-500">
                                <button style={buttonStyle} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Contact Me
                                </button>
                            </a>
                            <Socials/>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
