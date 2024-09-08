import { useState } from "react";
import ModifyButton from "../admin_universal_components/ModifyButton";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import MHSModal from "./MHSModal";

function MHSCard({ content, contents, setContents }) {
  //STATO PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE IN CASO DI MODIFICA CON SUCCESSO
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden border-2 border-black p-2 rounded-xl">
      <div className="flex-shrink-0">
        <img
          className="object-cover w-full h-48 rounded-lg"
          src={`${content.cover}`}
          alt="content image"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <div className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
              {content.title}
            </h3>
            <p className="text-lg font-normal text-gray-500">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      <ModifyButton setOpenModal={setOpenModal} />

      {/* MODALE PER MODIFICARE LA CLASSE */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DELLA LEZIONE */}
      {openModal && (
        <MHSModal
          content={content}
          setOpenModal={setOpenModal}
          contents={contents}
          setContents={setContents}
          setOpenModalSuccess={setOpenModalSuccess}
        />
      )}

      {/* MODALE DI MODIFICA CON SUCCESSO */}
      {openModalSuccess && (
        <ModifyModalSuccess setOpenModalSuccess={setOpenModalSuccess} />
      )}
    </div>
  );
}

export default MHSCard;
