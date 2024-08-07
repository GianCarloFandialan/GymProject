import { useContext, useState } from "react"
import { HomePageContext } from "../../services/context"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HomeSection() {

  //USO IL CONTEXT
  const { contents, setContents } = useContext(HomePageContext)

  //CREO UNO STATO PER GESTIRE SOLO I DATI DELL'HERO CHE MI SERVONO
  const [ sectionContent, setSectionContent ] = useState(contents.filter(hero => hero.title == "CHI SIAMO?"))

  return (
    <>
      <motion.section
        initial={{ opacity:0, x: -60}} 
        whileInView={{ opacity:1, x: 0 }}
        viewport={{
          amount: "all",
          margin: "200px", 
        }}
        transition={{duration: 1.5,}}
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src={`${sectionContent[0].cover}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">{sectionContent[0].title}</h2>

              <p className="mt-4 text-gray-600 text-xl">
                {sectionContent[0].description}
              </p>

              <Link to="/registrazione">
                <button
                  href="#"
                  className="mt-8 inline-block rounded bg-black px-12 py-3 text-lg font-bold text-white transition hover:bg-gray-800 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  ISCRIVITI
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default HomeSection