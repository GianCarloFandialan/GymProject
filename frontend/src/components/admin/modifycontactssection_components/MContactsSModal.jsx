import { AnimatePresence, motion } from "framer-motion";
import MContactsSModalForm from "./mcontactssmodal_components/MContactsSModalForm";

function MContactsSModal({
  contact,
  setOpenModal,
  contacts,
  setContacts,
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
                  Modifica il contatto
                </h3>
              </div>

              {/* FORM PER MODIFICARE IL CONTATTO */}
              {/* SI PASSANO COME PARAMETRI: LA FUNZIONE PER MODIFICARE LO STATO DI QUSTO MODALE, L'OGGETTO CONTENTE I DATI DEL CONTATTO, FUNZIONE PER GESTIRE LO STATO CHE GESTISCE IL MODALE NEL CASO DI AGGIUNTA CON SUCCESSO DI UN CONTATTO */}
              <MContactsSModalForm
                contact={contact}
                setOpenModal={setOpenModal}
                contacts={contacts}
                setContacts={setContacts}
                setOpenModalSuccess={setOpenModalSuccess}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MContactsSModal;
