import { useEffect, useState } from "react";
import { getContents } from "../../services/api";
import FullPageSpinner from "../spinners/FullPageSpinner";
import MHSCard from "./modifyhomesection_components/MHSCard";

function ModifyHomeSection() {
  //STATO PER MEMORIZZARE L'ARRAY DEI CONTENUTI
  const [contents, setContents] = useState([]);

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //AL CARICAMENTO DEL COMPONENTE ESEGUO LA CHIAMATA API PER OTTENERE I CONTENUTI
  useEffect(() => {
    //SI AGGIORNA LO STATO DELLO SPINNER
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

        //SI AGGIORNA LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch del contenuti: ", error);
      }
    };
    //CHIAMIAMO LA FUNZIONE fetchContent
    fetchContent();
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
            <h3 className="text-4xl font-black leading-6 text-gray-800 mt-3 uppercase pl-3">
              Homepage
            </h3>
          </div>

          <div className="relative mx-auto max-w-7xl ">
            <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
              {/* CARD DELLA HOME HERO */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTO DELLA HOME HERO */}
              <MHSCard
                content={
                  contents.filter((hero) => hero.title == "Jumbotron")[0]
                }
                contents={contents}
                setContents={setContents}
              />
              {/* CARD DELLA HOME SECTION */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTO DELLA HOME SECTION */}
              <MHSCard
                content={
                  contents.filter((hero) => hero.title == "CHI SIAMO?")[0]
                }
                contents={contents}
                setContents={setContents}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ModifyHomeSection;
