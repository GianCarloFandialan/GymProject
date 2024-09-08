import { useEffect, useState } from "react";
import FullPageSpinner from "../spinners/FullPageSpinner";
import { getSubscriptions } from "../../services/api";
import MSSCard from "./modifysubscriptionssection_components/MSSCard";
import AddNewSubscriptionContainer from "./modifysubscriptionssection_components/AddNewSubscriptionContainer";

function ModifySubscriptionsSection() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DEGLI ABBONAMENTI
  const [subscriptions, setSubscriptions] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE GLI ABBONAMENTI
  useEffect(() => {
    //SI AGGIORNA LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA GET PER OTTENERE GLI ABBONAMENTI
    const fetchSubscriptions = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI GLI ABBONAMENTI
        const response = await getSubscriptions();
        //AGGIORNA LO STATO CON I DATI DEGLI ABBONAMENTI
        setSubscriptions(response.data);
        //SI AGGIORNA LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch degli abbonamenti: ", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchSubscriptions
    fetchSubscriptions();
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
              abbonamenti
            </h3>
          </div>

          <div className="relative mx-auto max-w-7xl ">
            <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
              {/* CARDS DEGLI ABBONAMENTI */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DELL'ABBONAMENTO */}
              {subscriptions.map((subscription) => {
                return (
                  <MSSCard
                    key={subscription._id}
                    subscription={subscription}
                    subscriptions={subscriptions}
                    setSubscriptions={setSubscriptions}
                  />
                );
              })}
            </div>

            <AddNewSubscriptionContainer
              setSubscriptions={setSubscriptions}
              subscriptions={subscriptions}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default ModifySubscriptionsSection;
