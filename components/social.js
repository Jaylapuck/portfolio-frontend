import 'bootstrap/dist/css/bootstrap.css'
import Image from "next/image";
import {useEffect, useState} from "react";


export default function Home() {

    const [socials, setSocials] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/socials`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSocials(data.data);
            })
    }, []);

    console.log(socials);

    return (
        <div className="row">
            {socials.map(social => (
                <div key={social.id} className="text-3xl col">
                    <p>
                        <a href={social.attributes.link} className="text-blue-500">
                            <Image
                                src={social.attributes.icon}
                                alt={social.attributes.name}
                                width={30}
                                height={30}
                                className="rounded-full w-32 h-32"
                            />
                        </a>
                    </p>
                </div>
            ))}
        </div>
    );
}
