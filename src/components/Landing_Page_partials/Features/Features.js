import { useRef, useEffect, useState } from 'react';
import SectionTitle from './Section_Title';
import SingleFeature from './Single_Feature';
import { FaRobot, FaCogs, FaLock, FaChartLine, FaBriefcase, FaRocket } from 'react-icons/fa';

const Features = () => {
    const featuresData = [
        {
            id: 1,
            icon: <FaRobot />,
            title: 'Robotic Process Automation',
            paragraph: 'Automate repetitive tasks and streamline business processes with RPA technology.',
        },
        {
            id: 2,
            icon: <FaCogs />,
            title: 'Efficiency Boost',
            paragraph: 'Boost operational efficiency by eliminating manual work and reducing errors.',
        },
        {
            id: 3,
            icon: <FaLock />,
            title: 'Enhanced Security',
            paragraph: 'Ensure data security and compliance through advanced RPA security measures.',
        },
        {
            id: 4,
            icon: <FaChartLine />,
            title: 'Improved Productivity',
            paragraph: 'Increase productivity by allowing employees to focus on high-value tasks.',
        },
        {
            id: 5,
            icon: <FaBriefcase />,
            title: 'End-to-End Automation',
            paragraph: 'Achieve end-to-end automation by integrating RPA with existing systems and applications.',
        },
        {
            id: 6,
            icon: <FaRocket />,
            title: 'Business Transformation',
            paragraph: 'Drive business transformation and innovation through RPA implementation.',
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
        marginTop: showFeatures ? '50px' : '0',
        opacity: showFeatures ? '1' : '0',
        transition: 'margin-top 1500ms  ease-out, opacity 1500ms ease-out',
    };

    return (
        <section id="features" className="bg-slate-50 z-5 py-16 md:py-20 lg:py-28">
            <div className="flex flex-col items-center justify-center "
                ref={featuresRef} style={containerStyle}>
                <SectionTitle
                    title="Main Features"
                    paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
                    center
                />

                <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 mx-3">
                    {featuresData.map((feature) => (
                        <SingleFeature key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
