import { useEffect, useState } from "react";
import { getGyms } from "../services/api";
import GymSectionLeft from "../components/gym/GymSectionLeft";
import GymSectionRight from "../components/gym/GymSectionRight";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import GymHero from "../components/gym/GymHero";
import Closer from "../components/footer/Closer";

function Gyms() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DELLE PALESTRE
  const [gyms, setGyms] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE LE PALESTRE
  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    //SI AGGIORNA LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE LE PALESTRE
    const fetchGyms = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI LE PALESTRE
        const response = await getGyms();
        //AGGIORNA LO STATO CON I DATI DELLE PALESTRE
        setGyms(response.data);
        //SI AGGIORNA LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch delle palestre: ", error);
      }
    };

    //SI CHIAMA LA FUNZIONE fetchGyms
    fetchGyms();
  }, []);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div>
          {/* HERO DELLA SEZIONE PALESTRE */}
          <GymHero />
          {/* PER DARE QUELL'EFFETTO ALTERNATO ALLA PAGINA FACCIO SI CHE IN MODO ALTERNATO LE CLASSI VENGANO SUDDIVIE IN GymSectionLeft(DISPOSTE A SINISTRA) E IN GymSectionRight(DISPOSTE A DESTRA) */}
          {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DELLA PALESTRA */}
          {gyms.map((gym, index) => {
            if (index % 2 === 0) {
              return <GymSectionLeft gym={gym} key={gym._id} />;
            } else {
              return <GymSectionRight gym={gym} key={gym._id} />;
            }
          })}
          {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
          <Closer />
        </div>
      )}
    </>
  );
}

export default Gyms;
