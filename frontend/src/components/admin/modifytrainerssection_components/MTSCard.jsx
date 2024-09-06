import { useState } from "react";
import TrainerSpecializationCheck from "../../trainers/trainersection_components/TrainerSpecializationCheck";
import ModifyButton from "../ModifyButton";
import MTSModal from "./MTSModal";
import ModifyModalSuccess from "../ModifyModalSuccess";

function MTSCard({ trainer, trainers, setTrainers }) {
  //STATO PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE IN CASO DI MODIFICA CON SUCCESSO
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden border-2 border-black p-2 rounded-xl">
      <div className="flex-shrink-0">
        <img
          className="object-cover w-full h-48 rounded-lg"
          src={`${trainer.avatar}`}
          alt="trainer image"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <div className="block mt-2 space-y-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
              {trainer.nome} {trainer.cognome}
            </h3>
            <ul className="text-lg font-normal text-gray-500">
              Specializations:
              {trainer.spcialization.map((specialization, index) => {
                return (
                  <li className="flex" key={specialization + index}>
                    <TrainerSpecializationCheck />
                    <span>{specialization}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <ModifyButton setOpenModal={setOpenModal} />

      {/* MODALE PER MODIFICARE IL TRAINER */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DEL TRAINER */}
      {openModal && (
        <MTSModal
          trainer={trainer}
          setOpenModal={setOpenModal}
          trainers={trainers}
          setTrainers={setTrainers}
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

export default MTSCard;
