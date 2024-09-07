import { useEffect, useState } from "react";
import FullPageSpinner from "../spinners/FullPageSpinner";
import { getGyms } from "../../services/api";
import MGSCard from "./modifygmsection_components/MGSCard";
import AddNewGymContainer from "./modifygmsection_components/AddNewGymContainer";

function ModifyGymSection() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DELLE PALESTRE
  const [gyms, setGyms] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE LE PALESTRE
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE LE PALESTRE
    const fetchGyms = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTE LE PALESTRE
        const response = await getGyms();
        //AGGIORNA LO STATO CON I DATI DELLE PALESTRE
        setGyms(response.data);
        console.log(response.data);

        //AGGIORNO LO STATO DELLO SPINNER
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
        <section className="mt-10">
          <div className="pb-4 border-b border-gray-600 ">
            <h3 className="text-4xl font-black leading-6 text-gray-800 mt-24 uppercase pl-3">
              Palestre
            </h3>
          </div>

          <div className="relative mx-auto max-w-7xl ">
            <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
              {/* CARDS DELLE PALESTRE */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DELLA PALESTRA */}
              {gyms.map((gym) => {
                return (
                  <MGSCard
                    key={gym._id}
                    gym={gym}
                    gyms={gyms}
                    setGyms={setGyms}
                  />
                );
              })}
            </div>

            <AddNewGymContainer setGyms={setGyms} gyms={gyms} />
          </div>
        </section>
      )}
    </>
  );
}

export default ModifyGymSection;
