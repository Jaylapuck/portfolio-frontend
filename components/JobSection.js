import {
    Timeline,
    Container,
    YearContent,
    BodyContent,
    Section,
    Description,
} from 'vertical-timeline-component-react';
import {motion} from "framer-motion";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Main() {
    const customTheme = {
        yearColor: '#405b73',
        lineColor: '#d0cdc4',
        dotColor: '#262626',
        borderDotColor: '#d0cdc4',
        titleColor: '#405b73',
        subtitleColor: '#0250c4',
        textColor: '#262626',
    };

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

    const [work,  setWork ] = useState([]);
    const [school, setSchool] = useState([]);

    useEffect(() => {
        fetch( `${process.env.NEXT_PUBLIC_API_DEPLOYMENT_URL}api/timelines`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(res => res.json())
            .then(res => {
                let work = [];
                let school = [];

                res.data.forEach(timeline => {
                    if(timeline.attributes.Type === "Work") {

                        if(!timeline.attributes.EndDate) {
                            work.unshift({Id: timeline.id,Title: timeline.attributes.Title, Description: timeline.attributes.Description, SmallDescription: timeline.attributes.SmallDescription, StartDate: timeline.attributes.StartDate, EndDate: timeline.attributes.EndDate, });
                        }
                        else {
                            work.push({Id: timeline.id,Title: timeline.attributes.Title, Description: timeline.attributes.Description, SmallDescription: timeline.attributes.SmallDescription, StartDate: timeline.attributes.StartDate, EndDate: timeline.attributes.EndDate, });
                        }
                    }
                    else if(timeline.attributes.Type === "School") {
                        if(!timeline.attributes.EndDate) {
                            school.unshift({Id: timeline.id,Title: timeline.attributes.Title, Description: timeline.attributes.Description, SmallDescription: timeline.attributes.SmallDescription, StartDate: timeline.attributes.StartDate, EndDate: timeline.attributes.EndDate, });
                        }
                        else {
                            school.push({Id: timeline.id,Title: timeline.attributes.Title, Description: timeline.attributes.Description, SmallDescription: timeline.attributes.SmallDescription, StartDate: timeline.attributes.StartDate, EndDate: timeline.attributes.EndDate, });
                        }
                    }
                });

                setSchool(school);
                setWork(work);
            })
            .catch(err => console.log(err));
    }, []);

    console.log(work);
    console.log(school);

    return (
    <motion.div variants={container} initial="hidden" animate="visible" className="container-fluid row">
        <h1 className="font-bold text-5xl">Timeline</h1>
        <div className="row text-left">
            <div className="col-6">
                <h3 className="font-bold text-4xl text-center">Work</h3>
                <Timeline class theme={customTheme} lang="en" dateFormat='short'>
                    {work.map(item => {
                            return (
                                <Container key={item.id}>
                                    {item.EndDate = null ?
                                        <YearContent startDate={item.StartDate} currentYear={true}/>:
                                        <YearContent startDate={item.StartDate} currentYear={item.EndDate}/>
                                    }
                                    <BodyContent>
                                        <Section title={""}>
                                            <Description variant='subtitle' text={item.Title} />
                                            <Description text={item.Description} />
                                            <Description text={item.SmallDescription} />
                                        </Section>
                                    </BodyContent>
                                </Container>
                            );
                        }
                    )}
                </Timeline>
            </div>
            <div className="col-6">
                <h3 className="font-bold text-4xl text-center">School</h3>
                <Timeline class theme={customTheme} lang="en" dateFormat='short'>
                    {school.map(item => {
                            return (
                                <Container key={item.id}>
                                    {item.EndDate = null ?
                                        <YearContent startDate={item.StartDate} currentYear={true}/>:
                                        <YearContent startDate={item.StartDate} currentYear={item.EndDate}/>
                                    }
                                    <BodyContent>
                                        <Section title={""}>
                                            <Description variant='subtitle' text={item.Title} />
                                            <Description text={item.Description} />
                                            <Description text={item.SmallDescription} />
                                        </Section>
                                    </BodyContent>
                                </Container>
                            );
                        }
                    )}
                </Timeline>
            </div>
        </div>

    </motion.div>
    );
};

