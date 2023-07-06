import Navbar from "../components/Common/Navbar"
import Hero from "../components/Landing_Page_partials/Hero"
import Features from "../components/Landing_Page_partials/Features/Features"
import Video from "../components/Landing_Page_partials/Video"
import Contact from "../components/Landing_Page_partials/Contact/Contact"
import Footer from "../components/Common/Footer"
import { useRouter } from "next/router";
import { getSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Features />
        <Video />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard/home",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
