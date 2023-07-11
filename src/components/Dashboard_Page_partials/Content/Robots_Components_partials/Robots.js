import Counters from "./Counters";
import Robots_Table from "./Robots_Table";
import Footer from "@/components/Common/Footer";
import { useState, useEffect, useRef } from "react";
import axios from "../../../../utils/axios";
import Loader from "@/components/Common/Loader";

const Robots = () => {
    // const robotData = {
    //     "counters": {
    //         "robots": 10,
    //         "connectedRobots": 5,
    //         "disconnectedRobots": 5
    //     },
    //     "robots": [
    //         {
    //             "robotId": 1,
    //             "robotAddress": '12.235.2.2',
    //             "joinedAt": "2021-07-01T00:00:00.000Z",
    //             "status": "connected"

    //         },
    //         {
    //             "robotId": 2,
    //             "robotAddress": '243.34.34.4',
    //             "joinedAt": "2021-07-01T00:00:00.000Z",
    //             "status": "disconnected"

    //         },
    //         {
    //             "robotId": 3,
    //             "robotAddress": '324234.34.34.4',
    //             "joinedAt": "2021-07-01T00:00:00.000Z",
    //             "status": "connected"

    //         },
    //     ]
    // };

    const [robotData, setRobotData] = useState(null);
    const [showFeatures, setShowFeatures] = useState(false);
    const featuresRef = useRef(null);

    const getRobotData = async () => {
        try {

            let res = await axios.get('/api/robots/get');
            console.log(res.data);
            setRobotData(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRobotData();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setShowFeatures(true);
                observer.unobserve(entry.target);
            }
        });

        if (featuresRef.current) {
            observer.observe(featuresRef.current);
        }

        return () => {
            if (featuresRef.current) {
                observer.unobserve(featuresRef.current);
            }
        };
    }, [robotData]);




    const containerStyle = {
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 700ms  ease-out, opacity 700ms ease-out',
    };


    if (!robotData) {
        return (
            <div className={`mt-10 h-96 w-full flex justify-center items-center`}>
                <Loader />
            </div>
        );
    } else {
        return (

            <div ref={featuresRef} style={containerStyle}>
                <Counters counters={robotData.counters} />
                <Robots_Table robots={robotData.robots} getRobots={getRobotData} />
                <Footer />
            </div>


        );
    }
};

export default Robots;

