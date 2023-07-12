import { useState, useEffect, useRef } from "react";
import Counters from "./Counter";
import Logs_Table from "./Logs_Table";
import Footer from "../../../../components/Common/Footer";
import axios from "../../../../utils/axios";
import { useSession } from 'next-auth/react';
import Loader from "@/components/Common/Loader";

const Logs = () => {
    const { data: session } = useSession();
    const [robotLogs, setRobotLogs] = useState([]);
    const [robotData, setRobotData] = useState(null);
    const [showFeatures, setShowFeatures] = useState(false);
    const featuresRef = useRef(null);
    const [selectedRobot, setSelectedRobot] = useState(null);
    const [logsOfSelectedRobot, setLogsOfSelectedRobot] = useState([]);

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
            const response = await axios.post('/api/elastic', {
                robotAddress: robotAddress,
                userId: userId
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setRobotLogs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRobotData();
    }, []);

    useEffect(() => {
        console.log(selectedRobot);
        if (selectedRobot) {
            getLogData(selectedRobot, session.userInfo.id);
            setLogsOfSelectedRobot(robotLogs);
        }
        console.log(logsOfSelectedRobot);
    }, [selectedRobot]);

    useEffect(() => {
        if (robotLogs) {
            setLogsOfSelectedRobot(robotLogs);
        } else {
            setLogsOfSelectedRobot([]);
        }
    }, [robotLogs]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (selectedRobot && session.userInfo.id) {
                getLogData(selectedRobot, session.userInfo.id);
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [selectedRobot, session.userInfo.id]);

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
                <Counters counters={{ robots: robotData.length }} />
                <Logs_Table logs={logsOfSelectedRobot} robots={robotData} selectedRobot={selectedRobot} setSelectedRobot={setSelectedRobot} />
                <Footer />
            </div>
        )
    }
}

export default Logs;
