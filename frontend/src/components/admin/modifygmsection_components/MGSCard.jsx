import { useState } from "react";
import DeleteButton from "../admin_universal_components/DeleteButton";
import ModifyButton from "../admin_universal_components/ModifyButton";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import MGSModal from "./MGModal";
import DGModal from "./deletegym_components/DGModal";

function MGSCard({ gym, gyms, setGyms }) {
  //STATO PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE IN CASO DI MODIFICA CON SUCCESSO
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE DI CANCELLAZIONE DEL TRAINER
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden border-2 border-black p-2 rounded-xl">
      <div className="flex-shrink-0">
        <img
          className="object-cover w-full h-48 rounded-lg"
          src={`${gym.cover}`}
          alt="gym image"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <div className="flex pt-6 space-x-1 text-sm text-gray-500">
            <span>{gym.hours}</span>
          </div>

          <div className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
              {gym.name}
            </h3>
            <p className="text-lg font-normal text-gray-500">{gym.tel}</p>
            <p className="text-lg font-normal text-gray-500">{gym.address}</p>
          </div>
        </div>
      </div>

      <ModifyButton setOpenModal={setOpenModal} />
      <DeleteButton setOpenDeleteModal={setOpenDeleteModal} />

      {/* MODALE PER MODIFICARE LA PALESTRA */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DEL TRAINER */}
      {openModal && (
        <MGSModal
          gym={gym}
          setOpenModal={setOpenModal}
          gyms={gyms}
          setGyms={setGyms}
          setOpenModalSuccess={setOpenModalSuccess}
        />
      )}

      {/* MODALE PER LA CANCELLAZIONE DEL TRAINER */}
      {openDeleteModal && (
        <DGModal
          id={gym._id}
          setOpenDeleteModal={setOpenDeleteModal}
          gyms={gyms}
          setGyms={setGyms}
        />
      )}

      {/* MODALE DI MODIFICA CON SUCCESSO */}
      {openModalSuccess && (
        <ModifyModalSuccess setOpenModalSuccess={setOpenModalSuccess} />
      )}
    </div>
  );
}

export default MGSCard;
