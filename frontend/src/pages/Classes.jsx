import { useEffect, useState } from "react";
import { getClasses } from "../services/api";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import ClassSectionLeft from "../components/classes/ClassSectionLeft";
import ClassSectionRight from "../components/classes/ClassSectionRight";
import ClassHero from "../components/classes/ClassHero";
import Closer from "../components/footer/Closer";

function Classes() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DELLE PALESTRE
  const [classes, setClasses] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE ESEGUO LA CHIAMATA API PER OTTENERE LE CLASSI
  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    //SI AGGIORNA LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE ASINCRONA PER OTTENRE LE CLASSI
    const fetchClasses = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI LE CLASSI
        const response = await getClasses();
        //AGGIORNA LO STATO CON I DATI DELLE CLASSI
        setClasses(response.data);
        //SI AGGIORNA LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch delle classi: ", error);
      }
    };
    //CHIAMIAMO LA FUNZIONE fetchClasses
    fetchClasses();
  }, []);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div className=" lg:w-[calc(100vw_-_140px)] md:w-[calc(100vw_-_100px)] flex flex-col items-center md:mx-auto">
          {/* HERO DELLA SEZIONE */}
          <ClassHero />
          {/* PER DARE QUELL'EFFETTO ALTERNATO ALLA PAGINA FACCIO SI CHE IN MODO ALTERNATO LE CLASSI VENGANO SUDDIVIE IN ClassSectionLeft(DISPOSTE A SINISTRA) E IN ClassSectionRight(DISPOSTE A DESTRA) */}
          {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DELLA CLASSE */}
          {classes.map((lesson, index) => {
            if (index % 2 === 0) {
              return <ClassSectionLeft lesson={lesson} key={lesson._id} />;
            } else {
              return <ClassSectionRight lesson={lesson} key={lesson._id} />;
            }
          })}
          {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
          <Closer />
        </div>
      )}
    </>
  );
}

export default Classes;
