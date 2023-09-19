import axios from "../../../../utils/axios";
import Counters from "./Counter";
import Tenants_Table from "./Tenants_Table";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Common/Footer";
import Loader from "@/components/Common/Loader";

const Tenants = () => {
    const [tenantsData, setTenantsData] = useState(null);



    const getData = async () => {
        try {
            // const res = await axios.get('/api/authenticate/tenant');
            // add dummy data
            const res = {
                data: [

                    {
                        "tenantId": 1,
                        "username": "Tenant 1",
                        "role": "Admin",
                        "creationTime": "2021-07-01",
                        "updateTime": "2021-07-01", 

                    },
                ],

            }
            setTenantsData(res.data);
        } catch (err) {
            console.log(err)
        }
    }


    const [showFeatures, setShowFeatures] = useState(false);
    const featuresRef = useRef(null);

    useEffect(() => {
        getData();
    }, [])

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
    }, [tenantsData]);




    const containerStyle = {
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 700ms  ease-out, opacity 700ms ease-out',
    };

    if (tenantsData) {
        return (
            <div ref={featuresRef} style={containerStyle} >
                <Counters counters={{ tenants: tenantsData.length }} />
                <Tenants_Table tenants={tenantsData} getData={getData} />
                <Footer />
            </div>
        )
    } else {
        return (
            <div className={`mt-10 h-96 w-full flex justify-center items-center`}>
                <Loader />
            </div>
        )
    }

}

export default Tenants