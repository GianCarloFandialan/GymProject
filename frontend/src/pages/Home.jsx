import { motion } from "framer-motion";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import { useEffect, useState } from "react";
import { getContents } from "../services/api";
import HomeHero from "../components/home/HomeHero";
import { HomePageContext } from "../services/context";
import HomeCarousel from "../components/home/HomeCarousel";
import HomeSection from "../components/home/HomeSection";
import HomeCloser from "../components/home/HomeCloser";

function Home() {

  //STATO PER MOMEMORIZZARE L'ARRAY DEI CONTENUTI
  const [contents, setContents] = useState([])
  
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true)

  //AL CARICAMENTO DEL COMPONENTE ESEGUO LA CHIAMATA API PER OTTENERE I CONTENUTI
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true)

    const fetchContent = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTENUTI
        const response = await getContents();
        console.log(response.data.filter(content => content.category == "homepage"));
        // AGGIORNA LO STATO CON I DATI DEI CONTENUTI
        setContents(response.data.filter(content => content.category == "homepage"));
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false)        
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch del contenuti:", error);
      }
    };
    // CHIAMIAMO LA FUNZIONE fetchContent
    fetchContent();
  }, [])

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ?
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner/>
        </div>

        :
        <HomePageContext.Provider value = { { contents, setContents } }>
          <div>
            <HomeHero/>
            <HomeCarousel/>
            <HomeSection/>
            <HomeCloser/>
          </div>
        </HomePageContext.Provider>
      }
    </>
  );

}

export default Home