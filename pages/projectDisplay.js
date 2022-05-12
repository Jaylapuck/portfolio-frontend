import Head from "next/head";
import Navbar from "../components/Navbar";
import {motion} from "framer-motion";
import Image from "next/image";
import {Carousel} from "react-bootstrap";
import { useRouter } from 'next/router'
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css'

export default function ProjectDisplay(){

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState([]);
    const [skills, setSkills] = React.useState("");
    const [github, setGithub] = React.useState([]);
    let id;

    const twoColumns = {
        columnCount: 2
    }

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

    if (typeof window !== "undefined") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        id = useRouter().query.id;
    }
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/projects/${id}`,{
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
                setImage(data.data.attributes.image_links.split(","));
                setGithub(data.data.attributes.GithubLinks.split(","));
            })
            .catch(err => console.log(err));

    }, [id]);
    return (
        <div>
            <Head>
                <title>Project</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Navbar/>
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-4xl font-bold text-center" style={fadeIn}>{title}</h1>
                    <p className="text-justify text-3xl">
                        {description}
                    </p>
                    <div className="row bg-white px-8 pt-6 pb-8 mb-4">
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
                    <div className="row bg-white px-8 pt-6 psb-8 mb-4">
                        <div className="col-md-12">
                            <h1 className="text-4xl font-bold text-center">Languages and Frameworks</h1>
                            <div className="text-center text-3xl">
                                <div style={twoColumns}>
                                    <ul>
                                        {skills.split(",").map((skill, index) => {
                                                return (
                                                    <li key={index}>{skill}</li>
                                                )
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {github.length > 0 && (
                    <div className="items-center container text-left">
                        <div className="row bg-white px-8 pt-6 pb-8 mb-4">
                            <h1 className="text-4xl font-bold text-center"> Repositories</h1>
                            <div className="col-12">
                                {github.map((github, index) => {
                                    return (
                                        //make image link lowercase
                                        <a href={github.toLowerCase()} key={index}>
                                            <li className="d-flex text-center flex-column align-items-center-3xl text-3xl">{github}</li>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
