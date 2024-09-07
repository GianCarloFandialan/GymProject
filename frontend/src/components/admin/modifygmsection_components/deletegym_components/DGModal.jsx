import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import DGDeleteButton from "./DGDeleteButton";

function DGModal({ setOpenDeleteModal, id, gyms, setGyms }) {
  return (
    <AnimatePresence>
      <motion.div
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenDeleteModal(false)}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-red-900 to-red-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-red-700 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">SUCCESSO</h3>
            <p className="text-center mb-6">Modifica avvenuta con successo!</p>
            <div className="flex gap-2">
              {/* AL CLICK CHIUDE IL MODALE E REINDERIZZA ALLA PAGINA CHAT */}
              <button
                onClick={() => {
                  setOpenDeleteModal(false);
                }}
                className="bg-white hover:opacity-90 transition-opacity text-gray-700 font-semibold w-full py-2 rounded"
              >
                Chiudi
              </button>
              {/* AL CLICK CHIUDE IL MODALE E REINDERIZZA ALLA PAGINA CHAT */}
              <DGDeleteButton
                id={id}
                setOpenDeleteModal={setOpenDeleteModal}
                gyms={gyms}
                setGyms={setGyms}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DGModal;
