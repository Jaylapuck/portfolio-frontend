import Head from "next/head";
import Navbar from "../components/Navbar";
import ProIco from "../public/pro.ico";
import {motion} from "framer-motion";
import 'bootstrap/dist/css/bootstrap.css'
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Aboutme(){

    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [residence, setResidence] = useState([]);
    const [address, setAddress] = useState([]);
    const [phone, setPhone] = useState([]);
    const [aboutme, setAboutme] = useState("");
    const link_resume = `${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}uploads/Resume_English_db89bd917a.docx`

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
        fetch( `${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/abouts/1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setEmail(res.data.attributes.Email);
                setAge(res.data.attributes.Age);
                setResidence(res.data.attributes.Residence);
                setAddress(res.data.attributes.Address);
                setPhone(res.data.attributes.Phone);
                setAboutme(res.data.attributes.Description);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        //create motion component
        <motion.div variants={container} initial="hidden" animate="visible" className="container-fluid row">
            <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="about-me">
                    <div>
                        <h3>About <span className="text-blue-500">Me</span> </h3>
                    </div>
                    <p className="text-gray-600 text-2xl">
                        {aboutme}
                    </p>
                </div>
                <div className="download-resume">
                    <a href={link_resume} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline-primary">
                            Download Resume
                        </Button>
                    </a>
                </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="info">
                    <div className="block-title">
                        <h3 className="text-gray-600 text-2xl">Info</h3>
                    </div>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td className="font-bold text-2xl">Age</td>
                            <td className="text-gray-600 text-2xl ">{age}</td>
                        </tr>
                        <tr>
                            <td className="font-bold text-2xl">Residence</td>
                            <td className="text-gray-600 text-2xl">{residence}</td>
                        </tr>
                        <tr>
                            <td className="font-bold text-2xl">Address</td>
                            <td className="text-gray-600 text-2xl">{address}</td>
                        </tr>
                        <tr>
                            <td className="font-bold text-2xl">Email</td>
                            <td className="text-gray-600 text-2xl">{email}</td>
                        </tr>
                        <tr>
                            <td className="font-bold text-2xl">Phone</td>
                            <td className="text-gray-600 text-2xl">{phone}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    )
}