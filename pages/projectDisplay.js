import Head from "next/head";
import ProIco from "../public/pro.ico";
import Navbar from "../components/Navbar";
import {motion} from "framer-motion";
import Image from "next/image";
import {Card, Carousel} from "react-bootstrap";
import Bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

export default function ProjectOne() {

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState([]);
    const [skills, setSkills] = React.useState("");
    const [github, setGithub] = React.useState([]);

    //gets the parameters from the url
    const query = new URLSearchParams(window.location.search);
    const project = query.get("id");



    const fadeIn = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_HELLO)
        fetch(`${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/projects/${project}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }

        })
            .then(res => res.json())
            .then(data => {
                setTitle(data.data.attributes.Title);
                setDescription(data.data.attributes.Description);
                setSkills(data.data.attributes.Skills);
                let githubArray = data.data.attributes.GithubLinks.split(",");
                let imageArray = data.data.attributes.image_links.split(",");
                setImage(imageArray);
                setGithub(githubArray);
            })
            .catch(err => console.log(err));

    }, []);
    return (
        <div>
            <Head>
                <title>Project</title>
                <link rel="icon" href={ProIco}/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Navbar/>
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-4xl font-bold text-center" style={fadeIn}>{title}</h1>
                    <p className="text-center text-3xl">
                        {description}
                    </p>
                    <div className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                        <Carousel>
                            {image.map((image, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <Image src={image} alt="project" width={1200} height={500}/>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                        <div className="col-md-12">
                            <h1 className="text-4xl font-bold text-center">Languages and Frameworks</h1>
                            <p className="text-center text-3xl">
                                {skills}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center container">
                        <div className="row bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                            <h1 className="text-4xl font-bold text-center"> Repositories</h1>
                            <div className="col-md-12">
                                {github.map((github, index) => {
                                    return (
                                        <a href={github} key={index} target="_blank" rel="noopener noreferrer">
                                            <p className="text-center text-3xl">{github}</p>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
