import { useEffect, useState } from "react";
import { getSubscriptions } from "../services/api";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import SubscriptionBlack from "../components/subscriptions/SubscriptionBlack";
import SubscriptionWhite from "../components/subscriptions/SubscriptionWhite";
import Closer from "../components/footer/Closer";
import { motion } from "framer-motion";
import NewSubscriptionModal from "../components/subscriptions/NewSubscriptionModal";
import ChangeSubscriptionModal from "../components/subscriptions/ChangeSubscriptionModal";

function Subscriptions() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DEGLI ABBONAMENTI
  const [subscriptions, setSubscriptions] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE GLI ABBONAMENTI
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE GLI ABBONAMENTI
    const fetchSubscriptions = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI GLI ABBONAMENTI
        const response = await getSubscriptions();
        console.log(response.data);
        //AGGIORNA LO STATO CON I DATI DEGLI ABBONAMENTI
        setSubscriptions(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch degli abbonamenti:", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchContacts
    fetchSubscriptions();
  }, []);

  //SI CREA UNO STATO PER GESTIRE IL MODALE PER ABBONARSI
  const [openModal, setOpenModal] = useState(false);

  //SI CREA UNO STATO PER GESTIRE IL MODALE PER CAMBIARE L'ABBONAMENTO
  const [openChangeModal, setOpenChangeModal] = useState(false);

  //SI CREA UNO STATO PER POTER GESTIRE QUALE ABBONAMENTO È STATO SELEZIONATO PER FARE L'ABBONAMENTO
  const [selectedSubscription, setSelectedSubscription] = useState("");

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div className="">
          {openModal && (
            <NewSubscriptionModal
              setOpenModal={setOpenModal}
              subscriptionId={selectedSubscription}
            />
          )}
          {openChangeModal && (
            <ChangeSubscriptionModal
              setOpenChangeModal={setOpenChangeModal}
              subscriptionId={selectedSubscription}
              subscriptions={subscriptions}
            />
          )}
          <motion.h2
            initial={{ opacity: 0, y: "-10vh" }}
            whileInView={{ opacity: 1, y: "0" }}
            transition={{ duration: 1 }}
            className="lg:text-6xl md:text-5xl text-3xl font-NCLMonsterBeast text-center mt-4"
          >
            ABBONAMENTI
          </motion.h2>
          <div className="relative items-center w-full mx-auto md:px-12 lg:px-16 max-w-7xl">
            <div>
              <div className="relative p-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 rounded-xl">
                {subscriptions.map((subscription, index) => {
                  if (index % 2 === 0) {
                    return (
                      <SubscriptionWhite
                        subscription={subscription}
                        key={subscription._id}
                        setOpenModal={setOpenModal}
                        setSelectedSubscription={setSelectedSubscription}
                        setOpenChangeModal={setOpenChangeModal}
                      />
                    );
                  } else {
                    return (
                      <SubscriptionBlack
                        subscription={subscription}
                        key={subscription._id}
                        setOpenModal={setOpenModal}
                        setSelectedSubscription={setSelectedSubscription}
                        setOpenChangeModal={setOpenChangeModal}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
          <Closer />
        </div>
      )}
    </>
  );
}

export default Subscriptions;
