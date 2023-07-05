import axios from "../../../../utils/axios";
import Counters from "./Counters";
import Package_Table from "./Package_Table";
import Footer from "@/components/Common/Footer";
import Loader from "@/components/Common/Loader";
import { useEffect, useRef, useState } from "react";

const Package = () => {
    const [packageData, setPackageData] = useState(null);

    const getData = async () => {
        try {
            const res = await axios.get('/api/packages/user/');
            setPackageData(res.data);
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
    }, [packageData]);

    const containerStyle = {
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 700ms  ease-out, opacity 700ms ease-out',
    };

    if (packageData) {
        return (

            <div  style={containerStyle} ref={featuresRef}>
                <Counters counters={packageData.counters} />
                <Package_Table packages={packageData.packages} getData={getData} />
                <Footer />
            </div>
    
        );
    } else {
        return (
            <Loader />
        )
    }

}

export default Package;
