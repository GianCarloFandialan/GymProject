import { useState } from "react";
import ModifyButton from "../admin_universal_components/ModifyButton";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import DeleteButton from "../admin_universal_components/DeleteButton";
import MContactsSModal from "./MContactsSModal";
import DContactModal from "./deletecontact_components/DContactModal";

function MContactsSCard({ contact, contacts, setContacts }) {
  //STATO PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE IN CASO DI MODIFICA CON SUCCESSO
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE DI CANCELLAZIONE DEL CONTATTO
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden border-2 border-black p-2 rounded-xl">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <div className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
              {contact.question}
            </h3>
            <p className="text-lg font-normal text-gray-500">
              {contact.answer}
            </p>
          </div>
        </div>
      </div>

      <ModifyButton setOpenModal={setOpenModal} />
      <DeleteButton setOpenDeleteModal={setOpenDeleteModal} />

      {/* MODALE PER MODIFICARE IL CONTATTO */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DEL CONTATTO */}
      {openModal && (
        <MContactsSModal
          contact={contact}
          setOpenModal={setOpenModal}
          contacts={contacts}
          setContacts={setContacts}
          setOpenModalSuccess={setOpenModalSuccess}
        />
      )}

      {/* MODALE PER LA CANCELLAZIONE DEL CONTATTO */}
      {openDeleteModal && (
        <DContactModal
          id={contact._id}
          setOpenDeleteModal={setOpenDeleteModal}
          contacts={contacts}
          setContacts={setContacts}
        />
      )}

      {/* MODALE DI MODIFICA CON SUCCESSO */}
      {openModalSuccess && (
        <ModifyModalSuccess setOpenModalSuccess={setOpenModalSuccess} />
      )}
    </div>
  );
}

export default MContactsSCard;
