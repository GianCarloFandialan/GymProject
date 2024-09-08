import { AnimatePresence, motion } from "framer-motion";
import MSSModalForm from "./mssmodal_components/MSSModalForm";

function MSSModal({
  subscription,
  setOpenModal,
  setSubscriptions,
  subscriptions,
  setOpenModalSuccess,
}) {
  return (
    <>
      <AnimatePresence>
        <motion.div
          //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenModal(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center [&amp;>div]:w-full bg-black rounded-xl"
          >
            <div className="rounded-xl border bg-card text-card-foreground shadow lg:w-[30vw] p-2">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight text-white">
                  Modifica l'abbonamento
                </h3>
              </div>

              {/* FORM PER MODIFICARE L'ABBONAMENTO' */}
              {/* SI PASSANO COME PARAMETRI: LA FUNZIONE PER MODIFICARE LO STATO DI QUSTO MODALE, L'OGGETTO CONTENTE I DATI DELL'ABBONAMENTO', FUNZIONE PER GESTIRE LO STATO CHE GESTISCE IL MODALE NEL CASO DI AGGIUNTA CON SUCCESSO DI UN TRAINER */}
              <MSSModalForm
                subscription={subscription}
                setOpenModal={setOpenModal}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                setOpenModalSuccess={setOpenModalSuccess}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MSSModal;
