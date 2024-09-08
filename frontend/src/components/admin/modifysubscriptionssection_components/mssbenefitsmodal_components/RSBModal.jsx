import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import RSBConfirmModal from "./rbsmodal_components/RSBConfirmModal";

function RSBModal({
  setOpenRemoveBenefitModal,
  setSubscriptions,
  subscriptions,
  setOpenModalSuccess,
  subscription,
}) {
  //STATO PER GESTIRE IL CONTENUTO DEL BENEFIT DA CANCELLARE
  const [deletingBenefitContent, setDeletingBenefitContent] = useState("");

  //STATO PER GESTIRE L'INDICE DEL BENEFIT DA CANCELLARE
  const [deletingBenefitIndex, setDeletingBenefitIndex] = useState("");

  //STATO PER POTER GESTIRE IL MODALE DI CANCELLAZIONE DEL BENEFIT
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //FUNZIONE PER GESTIRE IL CLICK DEL BOTTONE DI ELIMINAZIONE
  const handleDeleteClick = (benefit, index) => {
    //SI AGGIORNA LO STATO DEL CONTENUTO
    setDeletingBenefitContent(benefit);

    //SI AGGIORNA LO STATO DELL'INDICE
    setDeletingBenefitIndex(index);

    //SI APRE IL MODALE PER CONFERMARE L'ELIMINAZIONE
    setOpenDeleteModal(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenRemoveBenefitModal(false)}
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
                Inserisci i dati del nuovo beneift
              </h3>
            </div>

            <ul className="text-lg font-normal text-white">
              Benefits:
              {subscription.benefits.map((benefit, index) => {
                return (
                  <li className="flex items-center" key={benefit + index}>
                    <TiDelete
                      className="text-red-700 text-5xl min-w-12"
                      onClick={() => handleDeleteClick(benefit, index)}
                    />
                    {benefit}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center p-6 pt-0 gap-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-white"
                onClick={() => setOpenRemoveBenefitModal(false)}
              >
                Chiudi
              </button>
            </div>

            {openDeleteModal && (
              <RSBConfirmModal
                setOpenDeleteModal={setOpenDeleteModal}
                subscriptions={subscriptions}
                setSubscriptions={setSubscriptions}
                deletingBenefitIndex={deletingBenefitIndex}
                deletingBenefitContent={deletingBenefitContent}
                subscription={subscription}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RSBModal;
