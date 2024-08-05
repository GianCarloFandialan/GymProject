import { useEffect, useState } from "react";
import { getGyms } from "../services/api";
import GymSectionLeft from "../components/gym/GymSectionLeft";
import GymSectionRight from "../components/gym/GymSectionRight";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import GymHero from "../components/gym/GymHero";
import HomeCloser from "../components/home/HomeCloser";

function Gyms() {

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true)

  //STATO PER MOMEMORIZZARE L'ARRAY DELLE PALESTRE
  const [gyms, setGyms] = useState([])

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMTA API PER OTTENERE LE PALESTRE
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true)

    //  FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE LE PALESTRE
    const fetchGyms = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTENUTI
        const response = await getGyms();
        // AGGIORNA LO STATO CON I DATI DEI CONTENUTI
        setGyms(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false)        
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch del contenuti:", error);
      }
    };

    // CHIAMIAMO LA FUNZIONE fetchGyms
    fetchGyms();
  }, [])

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
        {isLoading ?
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner/>
        </div>
        :
        <div>
          <GymHero/>
          {gyms.map((gym, index) => {
            if (index % 2 === 0) {
              return(
                <GymSectionLeft gym={gym} key={gym._id}/>
              )
            } else {
              return (
                <GymSectionRight gym={gym} key={gym._id}/>
              )
            }
          })}
          <HomeCloser/>
        </div>
      }
      
    </>
  )
}

export default Gyms