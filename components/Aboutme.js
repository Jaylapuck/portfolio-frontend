import {motion} from "framer-motion";
import 'bootstrap/dist/css/bootstrap.css'
import {useEffect, useState} from "react";

export default function Aboutme(){

    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [residence, setResidence] = useState([]);
    const [address, setAddress] = useState([]);
    const [phone, setPhone] = useState([]);
    const [aboutme, setAboutme] = useState("");
    const link_resume = "https://res.cloudinary.com/dmu1gfkxm/raw/upload/v1644940182/Resume_English_5ce8635644_dy13yr.docx"

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

    //create a td without bold
    const tdStyle = {
        fontWeight: "normal"
    };

    const item = {
        color: "#4d00ff",
    }

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
        <motion.div variants={container} initial="hidden" animate="visible" className="row">
            <div className="col-6">
                <div className="about-me">
                    <div>
                        <h3>About <span style={item}>Me</span> </h3>
                    </div>
                    <p className=" text-2xl text-justify">
                        {aboutme}
                    </p>
                </div>
                <div className="download-resume">
                    <a href={link_resume} target="_blank" rel="noopener noreferrer">
                        <button style={buttonStyle}>
                            Download Resume
                        </button>
                    </a>
                </div>
            </div>
            <div className="col-6">
                <div className="info">
                    <div>
                        <h3>Info</h3>
                    </div>
                    <table style={tableStyle} className="table">
                        <tbody>
                        <tr>
                            <td>Age</td>
                            <td style={tdStyle}>{age}</td>
                        </tr>
                        <tr>
                            <td>Residence</td>
                            <td style={tdStyle}>{residence}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td style={tdStyle}>{address}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td style={tdStyle}>{email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td style={tdStyle}>{phone}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    )
}