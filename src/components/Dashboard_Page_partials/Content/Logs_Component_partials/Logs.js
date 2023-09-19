import { useState,useEffect ,useRef } from "react";
import Counters from "./Counter";
import Logs_Table from "./Logs_Table";
import Footer from "../../../../components/Common/Footer";

const Logs = () => {
    const robotData = [
        {
            robotId: 1,
            robotAddress: '12.235.2.2',
        },
        {
            robotId: 2,
            robotAddress: '243.34.34.4',
        },
        {
            robotId: 3,
            robotAddress: '324234.34.34.4',
        },
    ];

    const robotLogs = [
        {
            "logType": "INFO",
            "name": "Labels",
            "status": "Running",
            "timestamp": "12345",
            "message": "this is a log entry 2",
            "robotId": 1
        },
        {
            "logType": "INFO",
            "name": "Labels",
            "status": "Running",
            "timestamp": "12345",
            "message": "this is a log entry 2",
            "robotId": 1
        },
        {
            "logType": "INFO",
            "name": "Labels",
            "status": "Running",
            "timestamp": "12345",
            "message": "this is a log entry 2",
            "robotId": 1
        },
    ];

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
           setLogsOfSelectedRobot(robotLogs);
        }
        console.log(logsOfSelectedRobot);
      }, [selectedRobot]);



    return (
        <div ref={featuresRef} style={containerStyle}>
        <Counters counters={{robots:robotData.length}}/>
        <Logs_Table logs={logsOfSelectedRobot} robots={robotData} selectedRobot={selectedRobot} setSelectedRobot={setSelectedRobot}/>
        <Footer/>
        </div>
    )

}

export default Logs;