import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Counters from './Counters';
import Jobs_Table from './Jobs_Table';
import Footer from "@/components/Common/Footer";
import axios from "../../../../utils/axios";
import Loader from "@/components/Common/Loader";


const Jobs = () => {
    // const jobsData = {
    //     "counters": {
    //         "jobs": 23,
    //         "pending": 12,
    //         "executed": 11,
    //         "failed": 6,
    //     },
    //     "packages": [ {
    //         "packageId": 1,
    //         "packageName": "Package 1",
    //         "description": "Description 1",
    //         "createdDate": "2021-07-01",
    //         "downloadUrl": "https://www.google.com",

    //     },
    //     {
    //         "packageId": 4,
    //         "packageName": "Package 2",
    //         "description": "Description 2",
    //         "createdDate": "2021-07-02",
    //         "downloadUrl": "https://www.google.com",
    //     },
    //     ],

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
    //     ],

    //     "jobs": [
    //         {
    //             "id": 1,
    //             "robotName": "robot1",
    //             "packageName": "package1",
    //             "status": "pending",
    //         },
    //         {
    //             "id": 2,
    //             "robotName": "robot2",
    //             "packageName": "package2",
    //             "status": "executed",
    //         },
    //         {
    //             "id": 3,
    //             "robotName": "robot3",
    //             "packageName": "package3",
    //             "status": "failed",
    //         },
    //     ]

    // }
    const [showFeatures, setShowFeatures] = useState(false);
    const [jobsData, setJobsData] = useState(false);
    const featuresRef = useRef(null);

    const getJobsData = async () => {
        try {

            let res = await axios.get('/api/jobs/get');
            setJobsData(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        getJobsData();
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
    }, [jobsData]);




    const containerStyle = {
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 700ms  ease-out, opacity 700ms ease-out',
    };


    if (!jobsData) {
        return (
            <div className={`mt-10 h-96 w-full flex justify-center items-center`}>
                <Loader />
            </div>
        );
    } else {
        return (
            <div ref={featuresRef} style={containerStyle}>
                <Counters counters={jobsData.counters} />
                <Jobs_Table jobs={jobsData.jobs} robots={jobsData.robots} packages={jobsData.packages} getJops={getJobsData} />
                <Footer />
            </div>
        );
    }
}

export default Jobs;