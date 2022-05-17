import Head from "next/head";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.css'

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
    borderRadius: "10px",
    fontWeight: "bold",
};

export default function Contact(){

    return(
        <div>
            <Head>
                <title>Contact</title>
            </Head>
            <Navbar />
            <div className="flex justify-center items-center flex-col pt-40 text-center  lg:text-8xl text-6xl space-y-2 container">
                <div>
                    <h1 className="text-5xl font-bold">Contact</h1>
                    <p className="text-xl">
                        If you have any questions or opportunities, feel free to contact me.
                    </p>
                    <div className="text-3xl">
                        <p>
                            <a href="mailto:ethylamide@icloud.com" className="text-blue-500">
                                <button style={buttonStyle}>
                                    Contact Me
                                </button>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}