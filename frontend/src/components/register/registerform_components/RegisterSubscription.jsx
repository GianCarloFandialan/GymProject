import { useEffect, useState } from "react";
import RegisterSubBlack from "./registersubscription_components/RegisterSubBlack";
import RegisterSubWhite from "./registersubscription_components/RegisterSubWhite";
import { getSubscriptions } from "../../../services/api";
import FullPageSpinner from "../../spinners/FullPageSpinner";

function RegisterSubscription({
  newUser,
  setNewUser,
  setOpenModal,
  selectedSubscription,
  setSelectedSubscription,
}) {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MOMEMORIZZARE L'ARRAY DEGLI ABBONAMENTI
  const [subscriptions, setSubscriptions] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMTA API PER OTTENERE GLI ABBONAMENTI
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //  FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE GLI ABBONAMENTI
    const fetchSubscriptions = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI GLI ABBONAMENTI
        const response = await getSubscriptions();
        console.log(response.data);
        // AGGIORNA LO STATO CON I DATI DEGLI ABBONAMENTI
        setSubscriptions(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch degli abbonamenti:", error);
      }
    };

    // CHIAMIAMO LA FUNZIONE fetchContacts
    fetchSubscriptions();
  }, []);

  //VARIBAILI CHE MI SERVONO PER AVERE COME INPUT UN'ETÀ MINIMA DI 18 ANNI
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (dd < 10) {
    dd = "0" + dd;
  }

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (mm < 10) {
    mm = "0" + mm;
  }

  var date = yyyy + "-" + mm + "-" + dd;

  //OGNI VOLTA CHE SI SELEZIONA UN ABBONAMENTO, SI CAMBIA
  useEffect(() => {
    setNewUser({
      ...newUser,
      Subscription: {
        ...newUser.Subscription,
        id: selectedSubscription,
        start: date,
      },
    });
  }, [selectedSubscription]);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div className="relative items-center col-span-6 mb-6 -mx-8">
          <div className="justify-center space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 xl:mx-0 xl:grid-cols-3">
            {subscriptions.map((subscription, index) => {
              if (index % 2 === 0) {
                return (
                  <RegisterSubWhite
                    subscription={subscription}
                    key={subscription._id}
                    setSelectedSubscription={setSelectedSubscription}
                    selectedSubscription={selectedSubscription}
                    setOpenModal={setOpenModal}
                  />
                );
              } else {
                return (
                  <RegisterSubBlack
                    subscription={subscription}
                    key={subscription._id}
                    setSelectedSubscription={setSelectedSubscription}
                    selectedSubscription={selectedSubscription}
                    setOpenModal={setOpenModal}
                  />
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterSubscription;
