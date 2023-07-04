import '@/styles/globals.css'
import Navbar from '../components/Common/Navbar'
import '../../node_modules/react-modal-video/css/modal-video.css'
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { setSessionToken } from "../utils/sessionStorage";
import Loader from '../components/Common/Loader';
import Head from 'next/head';



export default function App({ Component, pageProps }) {
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect( () => {
    const getSessionToken = async () => {
      const session = await getSession();
      if (session) {
        setSessionToken(session.accessToken);
      }
      setSessionLoaded(true);
    };
    getSessionToken();
    
  }, []);

  if (!sessionLoaded) {

    return (
      <div className={`h-screen w-screen flex justify-center items-center`}>

        <Loader />

      </div>
    )

  }



  return (

    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>ROBO-HIVE</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )



}
