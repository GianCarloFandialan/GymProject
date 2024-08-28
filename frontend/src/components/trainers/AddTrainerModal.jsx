import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { UserDataContext } from "../../services/context";
import { updateUser } from "../../services/api";

function AddTrainerModal({
  setOpenModal,
  selectedTrainer,
  setOpenSuccessModal,
}) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  const handleConfirmClick = async () => {
    try {
      const response = await updateUser(userData._id, {
        ...userData,
        trainerId: [...userData.trainerId, selectedTrainer._id],
      });
      setUserData(response.data);
      setOpenModal(false);
      setOpenSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenModal(false)}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-green-900 to-green-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-700 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">
              Conferma aggiunta trainer
            </h3>
            <p className="text-center mb-6">
              Confermare l'aggiunta di{" "}
              <span className="font-black text-lg">
                {selectedTrainer.nome} {selectedTrainer.cognome}
              </span>{" "}
              fra i propri trainer
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="bg-white hover:opacity-90 transition-opacity text-gray-700 font-semibold w-full py-2 rounded"
              >
                Annulla
              </button>
              <button
                onClick={handleConfirmClick}
                className="bg-white hover:opacity-90 transition-opacity text-green-700 font-semibold w-full py-2 rounded"
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

export default AddTrainerModal;
