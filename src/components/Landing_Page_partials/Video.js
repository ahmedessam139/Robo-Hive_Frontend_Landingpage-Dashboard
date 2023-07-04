
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import SectionTitle from './Features/Section_Title';
import ModalVideo from 'react-modal-video';

const Video = () => {
    const [isOpen, setOpen] = useState(false);
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
        transition: 'margin-top 1500ms ease-out, opacity 1500ms ease-out',
    };

    return (
        <section className="relative z-5 py-16 md:py-20 lg:py-28 flex items-center justify-center bg-slate-50">
            <div className="container" ref={featuresRef} style={containerStyle}>
                <SectionTitle
                    title="We are ready to help"
                    paragraph="Our team at Robo Hive is dedicated to providing the assistance you need for your business. Let us help you streamline your processes and achieve greater efficiency."
                    center
                    mb="80px"
                />

                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md" data-wow-delay=".15s" >
                            <div className="relative aspect-[60/40] items-center justify-center">
                                <Image src="/images/video/video.jpeg" alt="video image" fill />
                                <div className="absolute top-0 right-0 flex h-full w-full items-center justify-center">
                                    <button onClick={() => setOpen(true)} className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100" >
                                        <svg width="16" height="18" viewBox="0 0 16 18" className="fill-current" >
                                            <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalVideo
                channel="youtube"
                autoplay={true}
                start={true}
                isOpen={isOpen}
                videoId="3Vxlma4Vnuw"
                onClose={() => setOpen(false)}
            />

            <div className="absolute bottom-0 left-0 right-0 z-[-1]">
                <img src="/images/video/shape.svg" alt="shape" className="w-full" />
            </div>
        </section>
    );
};

export default Video;
