import NewsLatterBox from "./NewsLatterBox";
import { useRef, useState, useEffect } from 'react';

const Contact = () => {
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
    <section id="contact" className="overflow-hidden z-5 py-16 md:py-20 lg:py-28 bg-white-500">
      <div className="container" ref={featuresRef} style={containerStyle}>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="wow fadeInUp mb-12 ml-4 rounded-md bg-slate-100 py-11 px-8 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" >
              <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-gray-500">
                Our support team will get back to you ASAP via email.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark" >
                        Your Name
                      </label>
                      <input type="text" placeholder="Enter your name" className="mb-4 w-full rounded-md border border-blue-400 border-opacity-10 py-3 px-6 text-base font-medium text-blue-400 placeholder-gray-400 outline-none focus:border-blue-500 focus:border-opacity-100 focus-visible:shadow-none " />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark " >
                        Your Email
                      </label>
                      <input type="email" placeholder="Enter your email" className="mb-4 w-full rounded-md border border-blue-400 border-opacity-10 py-3 px-6 text-base font-medium text-blue-400 placeholder-gray-400 outline-none focus:border-blue-500 focus:border-opacity-100 focus-visible:shadow-none " />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label htmlFor="message" className="mb-3 block text-sm font-medium text-dark " >
                        Your Message
                      </label>
                      <textarea name="message" rows={5} placeholder="Enter your Message" className="mb-4 w-full rounded-md border border-blue-400 border-opacity-10 py-3 px-6 text-base font-medium text-blue-400 placeholder-gray-400 outline-none focus:border-blue-500 focus:border-opacity-100 focus-visible:shadow-none " >
                      </textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="duration-80 mb-4 w-full cursor-pointer rounded-md border border-transparent bg-blue-500 py-3 px-6 text-center text-base font-medium text-white outline-none transition ease-in-out hover:bg-opacity-80 hover:shadow-signUp focus-visible:shadow-none" >
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
