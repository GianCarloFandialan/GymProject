import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import ANSModal from "./addnewsubscription_components/ANSModal";

function AddNewSubscriptionContainer({ subscriptions, setSubscriptions }) {
  //FUNZIONE PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //SI CREA UNO STATO PER GESTIRE IL MODALE DELLA CONFERMA DEL NUOVO TRAINER
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  return (
    <>
      <div
        className="flex justify-center mt-10 flex-col w-full text-center cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <span className="uppercase font-bold text-2xl">
          aggiungi abbonamento
        </span>
        <div className="flex justify-center">
          <IoAddCircleOutline className="text-9xl text-center" />
        </div>
      </div>

      {/* MODALE PER AGGIUNGERE L'ABBONAMENTO */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DEGLI ABBONAMENTO */}
      {openModal && (
        <ANSModal
          setOpenModal={setOpenModal}
          setSubscriptions={setSubscriptions}
          subscriptions={subscriptions}
          setOpenModalSuccess={setOpenModalSuccess}
        />
      )}

      {/* MODALE DI MODIFICA CON SUCCESSO */}
      {openModalSuccess && (
        <ModifyModalSuccess setOpenModalSuccess={setOpenModalSuccess} />
      )}
    </>
  );
}

export default AddNewSubscriptionContainer;
