import { useContext, useState } from "react";
import { UserDataContext, IsLoggedInContext } from "../../services/context";
import SBModifyButton from "./SubscriptionBlack_components/SBModifyButton";
import SBRegisterButton from "./SubscriptionBlack_components/SBRegisterButton";
import SBSubscribeButton from "./SubscriptionBlack_components/SBSubscribeButton";
import SBCheck from "./SubscriptionBlack_components/SBCheck";
import { motion } from "framer-motion";

function SubscriptionBlack({
  subscription,
  setOpenModal,
  setSelectedSubscription,
  setOpenChangeModal,
}) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //STATO PER GESTIRE IL MODALE NEL CASO L'UTENTE NON ABBIA ANCORA UN ABBONAMENTO
  const [isSubscribing, setIsSubscribing] = useState(false);

  return (
    <motion.div
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      whileHover="hover"
      transition={{
        duration: 0.5,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.2,
        },
        viewport: {
          amount: "all",
          margin: "400px",
        },
      }}
      initial={{ opacity: 0, x: 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="relative flex flex-col p-8 bg-black rounded-2xl shadow-2xl hover:z-20"
    >
      <div className="relative flex-1">
        <h3 className="text-xl font-semibold text-white">
          {subscription.name}
        </h3>
        <p className="flex items-baseline mt-4 text-white ">
          <span className="text-5xl font-extrabold tracking-tight">
            €{subscription.price}
          </span>
          <span className="ml-1 text-xl font-semibold">/MESE</span>
        </p>
        <p className="mt-6 text-white text-solitud">
          {subscription.description}
        </p>

        <ul role="list" className="pt-6 mt-6 space-y-6 border-t">
          <span className="text-lg font-semibold text-white">
            Cosa include?
          </span>
          {subscription.benefits.map((benefit) => {
            return (
              <li className="flex" key={benefit}>
                <SBCheck />
                <span className="ml-3 text-white">{benefit}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-6 rounded-lg">
        {/* SE L'UTENTE HA ESEGUITO L'ACCESSO SI MOSTRA IL BOTTONE PER REGISTRARSI */}
        {isLoggedIn ? (
          <>
            {/* SE L'UTENTE È ABBONATO SI MOSTRA L BOTTONE MOSTRANTE QUALE ABBOANEMNTO È ATTUALE E NEGLI ALTRI IL BOTTONE PER MODIFICARE L'ABBONAMENTO */}
            {userData.hasOwnProperty("Subscription") ? (
              <>
                {userData.Subscription.id == subscription._id ? (
                  <button className="w-full items-center block px-10 py-3.5 text-base font-bold text-center transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-white">
                    ABBONAMENTO ATTUALE
                  </button>
                ) : (
                  //BOTTONE DI MODIFICA
                  //SI PASSANO COME PARAMETRI: L'ID DELL'ABBONAMENTO, LA FUNZIONE PER GESTIRE LO STATO DEL MODALE E ANCHE LA FUNZIONE PER GESTIRE LO STATO DELL'ABBONAMENTO SELEZIONATO
                  <SBModifyButton
                    id={subscription._id}
                    setSelectedSubscription={setSelectedSubscription}
                    setOpenChangeModal={setOpenChangeModal}
                  />
                )}
              </>
            ) : (
              <>
                {/* SE PERO L'UTENTE È UN TRAINER NON COMPARE NULLA ALTRIMENTI ESCEIL BOTTONE PER REGISTRARSI */}
                {userData.isTrainer ? (
                  <></>
                ) : (
                  //BOTTONE DI SOTTOSCRIZIONE
                  //SI PASSANO COME PARAMETRI: L'ID DELL'ABBONAMENTO, LA FUNZIONE PER GESTIRE LO STATO DEL MODALE E ANCHE LA FUNZIONE PER GESTIRE LO STATO DELL'ABBONAMENTO SELEZIONATO
                  <SBSubscribeButton
                    setOpenModal={setOpenModal}
                    setSelectedSubscription={setSelectedSubscription}
                    id={subscription._id}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <SBRegisterButton />
        )}
      </div>
    </motion.div>
  );
}

export default SubscriptionBlack;
