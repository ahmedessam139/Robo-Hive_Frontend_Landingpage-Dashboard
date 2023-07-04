import React from 'react';
import { useState , useEffect , useRef } from 'react';
import Counters from './Counters';
import Jobs_Table from './Jobs_Table';
import Footer from "@/components/Common/Footer";

const Jobs = () => {
    const jopsData = {
        "counters": {
            "jobs": 23,
            "pending": 12,
            "executed": 11,
            "failed": 6,
        },
        "jobs": [
            {
                "id": 1,
                "robotName": "robot1",
                "packageName": "package1",
                "status": "pending",
            },
            {
                "id": 2,
                "robotName": "robot2",
                "packageName": "package2",
                "status": "executed",
            },
            {
                "id": 3,
                "robotName": "robot3",
                "packageName": "package3",
                "status": "failed",
            },
        ]

    }
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


    return (
        <div ref={featuresRef} style={containerStyle}>
            <Counters counters={jopsData.counters} />
            <Jobs_Table jobs={jopsData.jobs} />
            <Footer />
        </div>
    );

}

export default Jobs;