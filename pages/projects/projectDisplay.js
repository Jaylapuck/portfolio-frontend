import Head from "next/head";
import Navbar from "../../components/Navbar";
import {motion} from "framer-motion";
import {Carousel} from "react-bootstrap";
import { useRouter } from 'next/router'
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css'

export default function ProjectDisplay(){

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState([]);
    const [frameworks, setFrameworks] = React.useState([]);
    const [languages, setLanguages] = React.useState([]);
    const [backend, setBackend] = React.useState([]);
    const [frontend, setFrontend] = React.useState([]);
    const [libraries, setLiraries] = React.useState([]);

    let id;
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
        fetch(`${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/projects/${id}?populate=*`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }

        })
            .then(res => res.json())
            .then(data => {
                var data = data.data.attributes;
                var Frameworks = data.Frameworks.map(function(item){
                    return item.Display;
                });
                var Languages = data.Languages.map(function(item){
                    return item.Display;
                });
                var Libraries = data.Libraries.map(function(item){
                    return item.Display;
                });
                setTitle(data.Title);
                setDescription(data.Description);
                setImage(data.image_links.split(","));
                setBackend(data.GithubBackend);
                setFrontend(data.GithubFrontend);
                setFrameworks(Frameworks);
                setLanguages(Languages);
                setLiraries(Libraries);

                console.log(libraries)

            })
            .catch(err => console.log(err));

    }, [id]);

    const divStyle = {
        backgroundColor: '#b3b3b3',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px #000000'
    };

    const tableStyle = {
        borderCollapse: "collapse",
        border: "none",
        width: "100%",
        margin: "auto",
        fontSize: "1.5rem",
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
        backgroundColor: "#4d00ff",
        borderRadius: "10px",
        padding: "10px"
    };

    const buttonStyle = {
        backgroundColor: "#4d00ff",
        border: "none",
        color: "white",
        padding: "10px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "1.5rem",
        cursor: "pointer",
        borderRadius: "10px"
    };


    return (
        <div>
            <Head>
                <title>Project</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Navbar/>
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <motion.div style={divStyle} initial="hidden" animate="visible" variants={fadeIn} className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-4xl font-bold text-center" style={fadeIn}>{title}</h1>
                    <h2 className="text-2xl font-bold text-center">Description</h2>
                    <p className="text-justify text-3xl me-5 mx-5">
                        {description}
                    </p>
                    <div className="row bg-white px-8 pt-6 pb-8 mb-4">
                        <Carousel>
                            {image.map((image, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img className="img-fluid" src={image} alt="project"/>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="row bg-white px-8 pt-6 psb-8 mb-4">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="text-center text-3xl">
                                <table style={tableStyle}>
                                    <thead>
                                    <tr>
                                        {languages.length > 0 ? <th scope="col">Languages</th> : null}
                                        {frameworks.length > 0 ? <th scope="col">Frameworks</th> : null}
                                        {libraries.length > 0 ? <th scope="col">Libraries</th> : null}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        {languages.length > 0 ?
                                            <td className="border">{languages.map((language, index) => {
                                            return (
                                                <div key={index}>
                                                    {language}
                                                </div>
                                            )
                                        })}</td> : null}

                                        {frameworks.length > 0 ?
                                            <td className="border">{frameworks.map((framework, index) => {
                                            return (
                                                <div key={index}>
                                                    {framework}
                                                </div>
                                            )
                                        })}</td> : null}

                                        {libraries.length > 0 ?
                                            <td className="border">{libraries.map((library, index) => {
                                                return (
                                                    <div key={index}>
                                                        {library}
                                                    </div>
                                                )
                                            })}</td>
                                            : null}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>

                    <h1 className="text-3xl font-bold">Repositories</h1>
                    <div className="row bg-white px-8 pt-6 psb-8 mb-4">
                        <ul className="text-3xl">
                            <a style={buttonStyle} className="col-4 btn btn-primary text-3xl m-2" href={frontend}>
                                Frontend
                            </a>
                            <a style={buttonStyle} className="col-4 btn btn-primary text-3xl m-2" href={backend}>
                                Backend
                            </a>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
