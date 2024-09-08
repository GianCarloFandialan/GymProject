import FullPageSpinner from "../components/spinners/FullPageSpinner";
import { useEffect, useState } from "react";
import { getContents } from "../services/api";
import HomeHero from "../components/home/HomeHero";
import { IsLoggedInContext, LogoutSuccessContext } from "../services/context";
import HomeCarousel from "../components/home/HomeCarousel";
import HomeSection from "../components/home/HomeSection";
import Closer from "../components/footer/Closer";
import { useContext } from "react";
import LogoutModal from "../components/navbar/navbar_components/usericon_components/logout_components/LogoutModal";

function Home() {
  //STATO PER MEMORIZZARE L'ARRAY DEI CONTENUTI
  const [contents, setContents] = useState([]);

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //AL CARICAMENTO DEL COMPONENTE ESEGUO LA CHIAMATA API PER OTTENERE I CONTENUTI
  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE ASINCRONA CHE EFFETTUA UNA CHIAMATA PER OTTENERE I CONENTUI DELLA HOMEPAGE
    const fetchContent = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTENUTI
        const response = await getContents();
        //AGGIORNA LO STATO CON I DATI DEI CONTENUTI DELLA HOMEPAGE
        setContents(
          response.data.filter((content) => content.category == "homepage")
        );
        console.log(
          response.data.filter((content) => content.category == "homepage")
        );

        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch del contenuti: ", error);
      }
    };
    //CHIAMIAMO LA FUNZIONE fetchContent
    fetchContent();
  }, []);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE IL MODALE NEL CASO DI LOGOUT AVVENUTO CON SUCCESSO
  const { logoutSuccess, setLogoutSuccess } = useContext(LogoutSuccessContext);

  //USEEFFECT CHE RIMUOVE IL TOKEN DI ACCESSO UNA VOLTA ESEGUITO IL LOGOUT
  useEffect(() => {
    if (logoutSuccess == false) {
      localStorage.removeItem("token");
    }
  }, [logoutSuccess]);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div data-testid="homepage">
          {/* HERO DELLA HOMEPAGE */}
          {/* PASSO COME PARAMETRI LO STATO DEI CONENUTI DELLA HOMEPAGE E LA USA RELATIVA FUNZIONE PER MODIFICARLO */}
          <HomeHero contents={contents} setContents={setContents} />
          {/* CAROSELLO CHE REINDERIZZA ALLA VARIE PAGINE */}
          {/* PASSO COME PARAMETRI LO STATO DEI CONENUTI DELLA HOMEPAGE E LA USA RELATIVA FUNZIONE PER MODIFICARLO */}
          <HomeCarousel contents={contents} setContents={setContents} />
          {/* SEZIONE DELLA HOMEPAGE */}
          {/* PASSO COME PARAMETRI LO STATO DEI CONENUTI DELLA HOMEPAGE E LA USA RELATIVA FUNZIONE PER MODIFICARLO */}
          <HomeSection contents={contents} setContents={setContents} />
          {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
          <Closer />
          {logoutSuccess && <LogoutModal />}
        </div>
      )}
    </>
  );
}

export default Home;
