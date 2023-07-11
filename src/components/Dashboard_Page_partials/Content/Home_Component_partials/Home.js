import Counters from "./Counters";
import Machines_Donut from "./Machines_Donut";
import { useEffect, useRef, useState } from "react";
import Jobs_Charts from "./Jops_Charts";
import Footer from "@/components/Common/Footer";
import axios from "../../../../utils/axios";
import Loader from "@/components/Common/Loader";


export default function Home() {
    const [homeData, setHomeData] = useState(null);
    const [showFeatures, setShowFeatures] = useState(false);
    const featuresRef = useRef(null);

    const getHomeData = async () => {
        try {

            let res = await axios.get('/api/home');
            setHomeData(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getHomeData();
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
    }, [homeData]);




    const containerStyle = {
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 700ms  ease-out, opacity 700ms ease-out',
    };
    if (!homeData) {
        return (
            <div className={`mt-10 h-96 w-full flex justify-center items-center`}>
                <Loader />
            </div>
        )
    } else {
        return (
            <div ref={featuresRef} style={containerStyle}>
                <Counters counters={homeData.counters} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="col-span-1 md:col-span-2">
                        <Jobs_Charts jobs={homeData.jobs} />
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <Machines_Donut machines={homeData.robots} />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}