import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import ANContactModal from "./addnewcontact_components/ANContactModal";

function AddNewContactContainer({ contacts, setContacts }) {
  //FUNZIONE PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //SI CREA UNO STATO PER GESTIRE IL MODALE DELLA CONFERMA DEL NUOVO CONTATTO
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  return (
    <>
      <div
        className="flex justify-center mt-10 flex-col w-full text-center cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <span className="uppercase font-bold text-2xl">aggiungi contatto</span>
        <div className="flex justify-center">
          <IoAddCircleOutline className="text-9xl text-center" />
        </div>
      </div>

      {/* MODALE PER AGGIUNGERE L'CONTATTO */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DEL CONTATTO */}
      {openModal && (
        <ANContactModal
          setOpenModal={setOpenModal}
          setContacts={setContacts}
          contacts={contacts}
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

export default AddNewContactContainer;
