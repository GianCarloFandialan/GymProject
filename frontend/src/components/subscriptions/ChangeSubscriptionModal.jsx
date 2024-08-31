import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { UserDataContext } from "../../services/context";
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateUser } from "../../services/api";

function ChangeSubscriptionModal({
  subscriptions,
  setOpenChangeModal,
  subscriptionId,
}) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI CREA UNO STATO PER POTER "SALVARE" L'ATTUALE ABBONAMENTO DELL'UTENTE
  const [userSub, setUserSub] = useState("");

  //SI CREA UNO STATO PER POTER "SALVARE" L'ATTUALE ABBONAMENTO DELL'UTENTE
  const [newSub, setNewSub] = useState("");

  //USEEFFECT AL CARICAMENTO DEL COMPOENENTE CHE RICAVA L'ABBONAMENTO ATTUALE E QUELLO NUOVO
  useEffect(() => {
    setUserSub(
      subscriptions.filter((sub) => sub._id == userData.Subscription.id)[0].name
    );

    setNewSub(subscriptions.filter((sub) => sub._id == subscriptionId)[0].name);
  }, []);

  //FUNZIONE PER GESTIRE IL CLICK DEL BOTTONE DI MODIFICA
  const handleChange = async () => {
    try {
      //EFFETTUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE L'ABBONAMENTO
      const response = await updateUser(userData._id, {
        ...userData,
        Subscription: {
          ...userData.Subscription,
          id: subscriptionId,
        },
      });
      //SI AGGIORNANO I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO CON LA RISPOSTA ALLA CHIAMATA
      setUserData(response.data);
      //SI CHIUDE IL MODALE
      setOpenChangeModal(false);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nell'aggiornamento dell'abbonamento: ", error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          //AL CLICK FUORI DAL MODALE, ESSO SI CHIUDE
          setOpenChangeModal(false);
        }}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-black to-gray-900 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-gray-700 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">
              Conferma cambiamento abbonamento
            </h3>
            <p className="text-center my-6">
              Premi conferma se vuoi cambiare il tuo attuale abbonamento
            </p>
            <p className="text-center mb-6">
              <span className="font-black text-xl"> "{userSub}"</span>{" "}
              <FaLongArrowAltRight className="inline-block" />
              <span className="font-black text-xl"> "{newSub}"</span>
            </p>
            <div className="flex gap-2">
              {/* AL CLICK CHIUDE IL MODALE */}
              <button
                onClick={() => {
                  setOpenChangeModal(false);
                }}
                className="bg-white hover:opacity-90 transition-opacity text-gray-700 font-black w-full py-2 rounded"
              >
                Chiudi
              </button>
              <button
                onClick={handleChange}
                className="bg-white hover:opacity-90 transition-opacity text-green-700 font-black w-full py-2 rounded"
              >
                Conferma
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ChangeSubscriptionModal;
