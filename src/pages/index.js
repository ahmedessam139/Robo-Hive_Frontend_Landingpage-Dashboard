import Navbar from "../components/Common/Navbar"
import Hero from "../components/Landing_Page_partials/Hero"
import Features from "../components/Landing_Page_partials/Features/Features"
import Video from "../components/Landing_Page_partials/Video"
import Contact from "../components/Landing_Page_partials/Contact/Contact"
import Footer from "../components/Common/Footer"


export default function Home() {
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
