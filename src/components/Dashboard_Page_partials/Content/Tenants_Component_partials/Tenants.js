import Counters from "./Counter";
import Tenants_Table from "./Tenants_Table";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Common/Footer";

const Tenants = () => {
    const tenantsData = [
        {
            "tenantId": "1",
            "username": "rrr",
            "email": "sdas@gmail.com",
            "role": "Admin",
            "creationTime": "2021-08-31T12:00:00Z",
            "password": "12345678",
            "updateTime": "2021-08-31T12:00:00Z",
        },
        {
            "tenantId": "2",
            "username": "dd",
            "email": "dsa@gmail.com",
            "password": "12345678",
            "role": "Admin",
            "creationTime": "2021-08-31T12:00:00Z",
            "updateTime": "2021-08-31T12:00:00Z",
        },
        {
            "tenantId": "3",
            "username": "fff",
            "email": "s@gmail,com",
            "password": "12345678",
            "role": "Admin",
            "creationTime": "2021-08-31T12:00:00Z",
            "updateTime": "2021-08-31T12:00:00Z",
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


    return (
        <div ref={featuresRef} style={containerStyle}>
            <Counters counters={{tenants: tenantsData.length}} />
            <Tenants_Table tenants={tenantsData} />
            <Footer />
        </div>
    )
}

export default Tenants