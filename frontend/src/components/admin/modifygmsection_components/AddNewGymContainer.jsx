import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import ANGModal from "./addnewgym_components/ANGModal";

function AddNewGymContainer({ gyms, setGyms }) {
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
        <span className="uppercase font-bold text-2xl">aggiungi palestra</span>
        <div className="flex justify-center">
          <IoAddCircleOutline className="text-9xl text-center" />
        </div>
      </div>

      {/* MODALE PER AGGIUNGERE IL TRAINER */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DEL TRAINER */}
      {openModal && (
        <ANGModal
          setOpenModal={setOpenModal}
          setGyms={setGyms}
          gyms={gyms}
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

export default AddNewGymContainer;
