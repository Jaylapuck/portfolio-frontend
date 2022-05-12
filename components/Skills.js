import 'bootstrap/dist/css/bootstrap.css'
import ProgressBar from "react-bootstrap/ProgressBar";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

export default function Skills(){

    const [front,  setFront ] = useState([]);
    const [back, setBack] = useState([]);
    const [database, setDatabase] = useState([]);

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

    useEffect(() => {
        fetch( `${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/skills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(res => {
                    let front = [];
                    let back = [];
                    let database = [];
                    res.data.forEach(skill => {
                        if(skill.attributes.Type === "Frontend"){
                            front.push({Id: skill.attributes.id,Name: skill.attributes.Name, progress: skill.attributes.Progress_Bar});
                        }
                        else if(skill.attributes.Type === "Backend"){
                            back.push({Id: skill.attributes.id, name: skill.attributes.Name, progress: skill.attributes.Progress_Bar});
                        }
                        else if(skill.attributes.Type === "Database"){
                            database.push({Id: skill.attributes.id, name: skill.attributes.Name, progress: skill.attributes.Progress_Bar});
                        }
                    });

                    setFront(front);
                    setBack(back);
                    setDatabase(database);
                }
            )
            .catch(err => console.log(err));
    }, []);

    return(
        <motion.div variants={container} initial="hidden" animate="visible" className="row">
            <h1 className="font-bold text-5xl">Skills</h1>
            <div className="col-md-4">
                <h1 className="text-gray-600 text-3xl">Frontend</h1>
                {front.map(skill => {
                    return(
                        <div  key={skill.id} className="row">
                            <div className="col-md-6">
                                <h3>{skill.Name}</h3>
                            </div>
                            <div className="col-md-6">
                                <ProgressBar now={skill.progress}/>
                            </div>
                        </div>
                    )
                })}
            </div >
            <div className="col-md-4">
                <h1 className="text-gray-600 text-3xl">Backend</h1>
                {back.map(skill => {
                    return(
                        <div key={skill.id} className="row">
                            <div className="col-md-6">
                                <h3>{skill.name}</h3>
                            </div>
                            <div className="col-md-6">
                                <ProgressBar now={skill.progress}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="col-md-4">
                <h1 className="text-gray-600 text-3xl">Database</h1>
                {database.map(skill => {
                    return(
                        <div key={skill.id} className="row">
                            <div className="col-6">
                                <h3>{skill.name}</h3>
                            </div>
                            <div className="col-6">
                                <ProgressBar now={skill.progress}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
