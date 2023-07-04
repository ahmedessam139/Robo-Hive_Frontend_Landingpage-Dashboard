import Counters from "./Counters";
import Package_Table from "./Package_Table";
import Footer from "@/components/Common/Footer";
import { useEffect, useRef, useState } from "react";

const Package = () => {
    const packageData = {
        "counters": {
            
            "packagesNumber": 23,
            "packagesWithJobs": 12,
            "dailyPackages": 11,
        },
        "packages": [
            {
                "packageId": 1,
                "packageName": "Package 1",
                "description": "Description 1",
                "createdDate": "2021-07-01",
                "downloadUrl": "https://www.google.com",
                
            },
            {
                "packageId": 4,
                "packageName": "Package 1",
                "description": "Description 2",
                "createdDate": "2021-07-02",
                "downloadUrl": "https://www.google.com",
            },
            {
                "packageId": 3,
                "packageName": "Package 3",
                "description": "Description 3",
                "createdDate": "2021-07-03",
                "downloadUrl": "https://www.google.com",
            },
            {
                "packageId": 4,
                "packageName": "Package 4",
                "description": "Description 4",
                "createdDate": "2021-07-04",
                "downloadUrl": "https://www.google.com",
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

        <div  style={containerStyle} ref={featuresRef}>
            <Counters counters={packageData.counters} />
            <Package_Table packages={packageData.packages} />
            <Footer />
        </div>

    );

}

export default Package;
