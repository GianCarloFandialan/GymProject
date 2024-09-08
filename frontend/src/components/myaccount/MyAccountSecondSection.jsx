import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../services/context";
import MASSFirstLine from "./myaccountsecondsection_components/MASSFirstLine";
import { getSubscriptions } from "../../services/api";
import FullPageSpinner from "../spinners/FullPageSpinner";
import MASSMethodButton from "./myaccountsecondsection_components/MASSMethodButton";
import MASSSubButton from "./myaccountsecondsection_components/MASSSubButton";
import MASSBenefits from "./MASSBenefits";
import MASSSubData from "./MASSSubData";
import ChangePaymentModal from "./myaccountsecondsection_components/ChangePaymentModal";
import { motion } from "framer-motion";

function MyAccountSecondSection() {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //SI CREA UNO STATO PER POTER GESTIRE LA LISTA DEI BENEFIT DELL'ATTUALE ABBONAMENTO DELL'ASS.TO
  const [subscriptionBenefits, setSubscriptionBenefits] = useState("");

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE GLI ABBONAMENTI E SI FILTRA QUELLO DELL'ASS.TO
  useEffect(() => {
    //SI AGGIORNA LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE GLI ABBONAMENTI
    const fetchSubscriptions = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI GLI ABBONAMENTI
        const response = await getSubscriptions();
        //AGGIORNA LO STATO CON I DATI DELL'ABBONAMETO DELL'ASS.TO
        setSubscriptionBenefits(
          response.data.filter(
            (subscription) => subscription._id == userData.Subscription.id
          )
        );
        //SI AGGIORNA LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dell'abbonamento: ", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchContacts
    fetchSubscriptions();
  }, [userData]);

  //SI CREA UNO STATO PER GESTIRE IL MODALE PER GESTIRE IL METODO DI PAGAMENTO DELL'ABBOANAMENTO
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <FullPageSpinner />
      ) : (
        <>
          {/* MODALE PER CAMBIARE IL METODO DI PAGAMENTO */}
          {/* SI PASSA COME PARAMETRO LA FUNZIONE PER GESTIRE LO STATO PER GESTIRE IL MODALE */}
          {openModal && <ChangePaymentModal setOpenModal={setOpenModal} />}
          <motion.section
            //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{ scale: 0 }}
            transition={{
              duration: 1.5,
              ease: "backInOut",
            }}
            className="relative py-4"
          >
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  {/* PRIMA LINEA DELLA SECONDA SEZIONE */}
                  <MASSFirstLine />
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2">
                      {userData.nome} {userData.cognome}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                      <i className="mr-2 text-lg "></i>
                      {userData.email}
                    </div>
                    {/* BENEFITS DELL'ABBONAMENTO DELL'UTENTE*/}
                    {/* SI PASSA COME PARAMETRO L'ARRAY CONENTE I BENEIFTS */}
                    <MASSBenefits benefits={subscriptionBenefits[0].benefits} />
                    {/* DATI DELL'ABBONAMENTO SOTTOSCRITTO DALL'ASS.TO */}
                    {/* SI PASSANO COME PARAMETRI, L'INIZO DELLA SOTTOSCRIZIONE DELL'ABBONAMENTO(start) E IL METODO DI PAGAMENTO(method) */}
                    <MASSSubData
                      start={userData.Subscription.start}
                      method={userData.Subscription.method.type}
                    />
                    {/* BOTTONE PER CAMBIARE IL METODO DI PAGAMENTO */}
                    {/* SI PASSA COME PARAMETRO, LA FUNZIONE PER GESTIRE LO STATO CHE AIUTA A GESTIRE IL MODALE PER CAMBIARE IL METODO DI PAGAMENTO */}
                    <MASSMethodButton setOpenModal={setOpenModal} />
                    {/* BOTTONE PER CAMBIARE L'ABBONAMENTO */}
                    <MASSSubButton />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </>
  );
}

export default MyAccountSecondSection;
