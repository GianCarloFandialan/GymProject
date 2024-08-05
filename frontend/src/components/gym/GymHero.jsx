import { useEffect, useState } from "react"
import { getContents } from "../../services/api"
import FullPageSpinner from "../spinners/FullPageSpinner"
import { motion } from "framer-motion";
import "./GymHero.css"

function GymHero() {

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true)

  //STATO PER MOMEMORIZZARE L'ARRAY DEI CONTENUTI
  const [contents, setContents] = useState([])

  useEffect(() => {

    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true)

    // FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE IL CONTENUTO OPPORTUNO
    const fetchContent = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTENUTI
        const response = await getContents();
        // AGGIORNA LO STATO CON I DATI DEI CONTENUTI
        setContents(response.data.filter(content => content.category == "gyms"));
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false)        
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch del contenuti:", error);
      }
    };

    // CHIAMIAMO LA FUNZIONE fetchContent
    fetchContent();
  },[])

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ?
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner/>
        </div>
        :
        <motion.section
          initial={{ opacity:0, y:'-35vh' }} 
          whileInView={{ opacity:1, y:'0' }}
          transition={{duration: 1.3}} 
        className="bg-center bg-no-repeat  bg-gray-700 bg-blend-multiply relative">
          <img 
            src={`${contents[0].cover}`} 
            alt="jumbotron image" 
            className="w-full lg:h-[calc(80vh_-_80px)] object-cover object-top"
          />
          <div 
            className=" w-full h-full text-center lg:py-56 absolute z-10 top-0 left-0 flex flex-col justify-center pt-10 "
          >
            <div className="bg-black opacity-75 absolute top-0 left-0 h-full w-full"></div>
            <div className="z-20 ">
              <h1 
                className="mb-4 text-md font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl font-NCLMonsterBeast px-5"
              >
                GYMPROJECT: <span className="lg:text-6xl font-NCLMonsterBeast font-semibold">{contents[0].title.toUpperCase()}</span>
              </h1>
              <p 
                className="mb-8 text-sm md:text-lg font-normal text-white lg:text-2xl sm:px-16 lg:px-48 md:block hidden"
              >
                {contents[0].description}
              </p>
              <p 
                className="mb-8 text-sm md:text-lg font-normal text-white lg:text-2xl sm:px-16 lg:px-48 md:hidden truncate-title px-5"
              >
                {contents[0].description}
              </p>
              <div 
                className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
              >
                <a 
                  href="#" 
                  className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                >
                  ISCRIVITI
                </a>  
              </div>
            </div>
          </div>
        </motion.section>
      }
    </>
  )
}

export default GymHero