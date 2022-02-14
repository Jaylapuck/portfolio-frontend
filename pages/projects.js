import Head from "next/head";
import ProIco from "../public/pro.ico";
import Navbar from "../components/Navbar";
import {motion} from "framer-motion";
import {Card, Carousel} from "react-bootstrap";
import Bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import React, {useEffect} from "react";

export default function Projects(){

    const [projects, setProjects] = React.useState([]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.1
          }
        }
      };

      const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1
        }
      };

    // find out how many projects there are
    useEffect(() => {
        fetch( `${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/projects`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setProjects(data.data);
        })
    }, []);
    return(
        <motion.div>
            <Head>
                <meta name="description" content="Project Page" />
                <link rel="icon" href={ProIco} />
                <title>Home Page</title>
            </Head>
            <Navbar />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={container}
            >
                <motion.div
                    variants={item}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                    <h1 className="text-5xl font-bold">Projects</h1>
                    <p className="text-xl">
                        Here are some of my projects.
                    </p>
                    <div className="row">
                        {projects.map(project => (
                            <Card key={project.id} className="col-sm m-2" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title className="text-6xl font-bold" >{project.attributes.Title}</Card.Title>
                                    <Card.Text className="text-2xl">
                                        {project.attributes.smallDescription}
                                    </Card.Text>
                                </Card.Body>
                                <Link href={"/projectDisplay/?id=" + project.id}>
                                    <input type="button" className="btn btn-primary m-4" value="More"/>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>

    )
}