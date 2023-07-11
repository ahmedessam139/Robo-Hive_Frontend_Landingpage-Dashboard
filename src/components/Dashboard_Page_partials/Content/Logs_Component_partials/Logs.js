import { useState,useEffect ,useRef } from "react";
import Counters from "./Counter";
import Logs_Table from "./Logs_Table";
import Footer from "../../../../components/Common/Footer";
import axios from "../../../../utils/axios";
import { useSession } from 'next-auth/react';

const Logs = () => {
    const {data: session} = useSession();
    const [robotLogs, setRobotLogs] = useState([]);
    const [robotData, setRobotData] = useState(null);
    const [showFeatures, setShowFeatures] = useState(false);
    const featuresRef = useRef(null);

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
    }, [robotData, robotLogs]);


    const getRobotData = async () => {
        try {
            let robots = await axios.get('/api/robots/get');
            setRobotData(robots.data.robots);
        } catch (error) {
            console.log(error);
        }
    }

    const getLogData = async (robotAddress, userId) => {
        try {
            let res = await fetch('/api/elastic', {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({robotAddress: robotAddress, userId: userId})
            });
            setRobotLogs(await res.json())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRobotData();
    }, []);

    const containerStyle = {
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 700ms  ease-out, opacity 700ms ease-out',
    };

    const [selectedRobot, setSelectedRobot] = useState(null);
    const [logsOfSelectedRobot, setLogsOfSelectedRobot] = useState([]);

    useEffect( () => {
        console.log(selectedRobot);
        if (selectedRobot) {
            getLogData(selectedRobot, session.userInfo.id);
            setLogsOfSelectedRobot(robotLogs);
        }
        console.log(logsOfSelectedRobot);
      }, [selectedRobot]);



    if (!robotData) {
        return <div>Loading...</div>;
    } else {
        return (
            <div ref={featuresRef} style={containerStyle}>
            <Counters counters={{robots:robotData.length}}/>
            <Logs_Table logs={logsOfSelectedRobot} robots={robotData} selectedRobot={selectedRobot} setSelectedRobot={setSelectedRobot}/>
            <Footer/>
            </div>
        )
    }

}

export default Logs;