import Counters from "./Counters";
import Machines_Donut from "./Machines_Donut";
import { useEffect, useRef, useState } from "react";
import Jobs_Charts from "./Jops_Charts";
import Footer from "@/components/Common/Footer";


export default function Home() {
    const homeData = {
        "counters": {
            "jobs": 23,
            "packages": 45,
            "machines": 33,
        },
        "jobs": {
            "total": 29,
            "pending": 12,
            "Executed": 11,
            "failed": 6,
        },
        "machines": {
            "connected": 12,
            "disconnected": 21,
        },
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
            <Counters counters={homeData.counters} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-1 md:col-span-2">
                <Jobs_Charts jobs={homeData.jobs} />
                </div>
                <div className="col-span-1 md:col-span-1">
                <Machines_Donut machines={homeData.machines} />
                </div>
            </div>
            <Footer />
        </div>
    );

}