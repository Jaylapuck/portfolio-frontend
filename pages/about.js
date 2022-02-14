import Head from "next/head";
import Navbar from "../components/Navbar";
import ProIco from "../public/pro.ico";
import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image";
import Aboutme from "../components/Aboutme";
import Skills from "../components/Skills";
import {motion} from "framer-motion";


export default function About() {

    // create a motion which comes from the bottom of the screen
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

    return (
        <div>
            <Head>
                <meta name="description" content="Home Page" />
                <link rel="icon" href={ProIco} />
                <title>About Page</title>
            </Head>
            <Navbar />
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <motion.div initial="hidden"
                            animate="visible"
                            variants={container}  className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <div className="title">
                        <h1 className="fw-bold">Jeremy Forest</h1>
                        <h2 className="text-gray-600">Full Stack Web Developer</h2>
                    </div>
                    <Aboutme/>
                    <Skills/>
                </motion.div>

            </div>

        </div>
    );
}
