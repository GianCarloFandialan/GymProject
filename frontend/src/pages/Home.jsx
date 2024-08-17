import FullPageSpinner from "../components/spinners/FullPageSpinner";
import { useEffect, useState } from "react";
import { getContents } from "../services/api";
import HomeHero from "../components/home/HomeHero";
import { HomePageContext, IsLoggedInContext, LogoutSuccessContext } from "../services/context";
import HomeCarousel from "../components/home/HomeCarousel";
import HomeSection from "../components/home/HomeSection";
import Closer from "../components/footer/Closer";
import { useContext } from "react";
import LogoutModal from "../components/navbar/navbar_components/usericon_components/logout_components/LogoutModal";

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

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext)

  //SI USA IL CONTEXT CHE AIUTA A GESITRE IL MODALE NEL CASO DI LOGOUT AVVENUTO CON SUCCESSO
  const { logoutSuccess, setLogoutSuccess } = useContext(LogoutSuccessContext)

  //USEEFFECT CHE REINDERIZZA RIMUOVE IL TOKEN DI ACCESSO UNA VOLTA ESEGUITO IL LOGOUT
  useEffect(() => {
    if (logoutSuccess == false) {
      localStorage.removeItem("token");
    }
  }, [logoutSuccess])

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
            <Closer/>
            {logoutSuccess && <LogoutModal setLogoutSuccess={setLogoutSuccess}/>}
          </div>
        </HomePageContext.Provider>
      }
    </>
  );

}

export default Home