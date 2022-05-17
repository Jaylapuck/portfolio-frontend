import 'bootstrap/dist/css/bootstrap.css'
import {useEffect, useState} from "react";
import {motion} from "framer-motion";

export default function Skills() {

    const [front, setFront] = useState([]);
    const [back, setBack] = useState([]);
    const [database, setDatabase] = useState([]);

    const container = {
        hidden: {opacity: 0, y: -100}, visible: {
            opacity: 1, y: 0, transition: {
                delay: 1, duration: 1
            }
        }
    };

    //make a function which takes in the progress and return a style object
    const progressStyle = (progress) => {
        return {
            width: `${progress}%`,
            color: "white",
            backgroundColor: "#ffa600",
            height: "100%",

        }
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

    useEffect(() => {
        fetch(`
            ${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/skills`, {
            method: "GET", headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(res => {
                let front = [];
                let back = [];
                let database = [];
                res.data.forEach(skill => {
                    if (skill.attributes.Type === "Frontend") {
                        front.push({
                            Id: skill.attributes.id,
                            Name: skill.attributes.Name,
                            progress: skill.attributes.Progress_Bar
                        });
                    } else if (skill.attributes.Type === "Backend") {
                        back.push({
                            Id: skill.attributes.id,
                            name: skill.attributes.Name,
                            progress: skill.attributes.Progress_Bar
                        });
                    } else if (skill.attributes.Type === "Database") {
                        database.push({
                            Id: skill.attributes.id,
                            name: skill.attributes.Name,
                            progress: skill.attributes.Progress_Bar
                        });
                    }
                });

                setFront(front);
                setBack(back);
                setDatabase(database);
            })
            .catch(err => console.log(err));
    }, []);

    return (<motion.div variants={container} initial="hidden" animate="visible" className="my-2">
            <h1 className="font-bold text-4xl m-0">Skills</h1>
            <div className="row">
                <div className="col-4">
                    <h1 className="text-gray-600 text-3xl">Frontend</h1>
                    <table style={tableStyle} className="text-3xl">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Progress</th>
                        </tr>
                        </thead>
                        <tbody>
                        {front.map(skill => (<tr key={skill.Id}>
                                <td className="border px-4 py-2">{skill.Name}</td>
                                <td className="border px-4 py-2">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={progressStyle(skill.progress)} aria-valuenow={skill.progress} aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                    <h1 className="text-gray-600 text-3xl">Backend</h1>
                    <table style={tableStyle} className="text-3xl">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Progress</th>
                        </tr>
                        </thead>
                        <tbody>
                        {back.map(skill => (<tr key={skill.Id}>
                                <td className="border px-4 py-2">{skill.name}</td>
                                <td className="border px-4 py-2">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={progressStyle(skill.progress)} aria-valuenow={skill.progress} aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                    <h1 className="text-gray-600 text-3xl">Database</h1>
                    <table style={tableStyle} className="table-auto text-3xl">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Progress</th>
                        </tr>
                        </thead>
                        <tbody>
                        {database.map(skill => (<tr key={skill.Id}>
                                <td className="border px-4 py-2">{skill.name}</td>
                                <td className="border px-4 py-2">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={progressStyle(skill.progress)} aria-valuenow={skill.progress} aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>)
}
