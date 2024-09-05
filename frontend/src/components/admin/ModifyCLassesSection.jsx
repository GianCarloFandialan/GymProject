import { useEffect, useState } from "react";
import { getClasses } from "../../services/api";
import FullPageSpinner from "../spinners/FullPageSpinner";
import MCSCard from "./modifyclassessection_components/MCSCard";

function ModifyClassesSection() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DELLE PALESTRE
  const [classes, setClasses] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE ESEGUO LA CHIAMATA API PER OTTENERE LE CLASSI
  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE ASINCRONA PER OTTENRE LE CLASSI
    const fetchClasses = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI LE CLASSI
        const response = await getClasses();
        //AGGIORNA LO STATO CON I DATI DELLE CLASSI
        setClasses(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
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
        <section className="">
          <div className="pb-4 border-b border-gray-600 ">
            <h3 className="text-4xl font-semibold leading-6 text-gray-800 mt-3 uppercase">
              CLassi
            </h3>
          </div>

          <div className="relative mx-auto max-w-7xl ">
            <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
              {/* CARDS DELLE CLASSI */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DELLA CLASSE */}
              {classes.map((lesson) => {
                return (
                  <MCSCard
                    key={lesson._id}
                    lesson={lesson}
                    classes={classes}
                    setClasses={setClasses}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ModifyClassesSection;
