import { useState } from "react";
import ModifyButton from "../admin_universal_components/ModifyButton";
import ModifyModalSuccess from "../admin_universal_components/ModifyModalSuccess";
import DeleteButton from "../admin_universal_components/DeleteButton";
import TrainerSpecializationCheck from "../../trainers/trainersection_components/TrainerSpecializationCheck";
import MSSModal from "./MSSModal";
import DSModal from "./deletesubscription_components/DSModal";
import AddBenefitButton from "./mssbenefitsmodal_components/AddBenefitButton";
import RemoveBenefitButton from "./mssbenefitsmodal_components/RemoveBenefitButton";
import ANSBModal from "./mssbenefitsmodal_components/ANSBModal";
import RSBModal from "./mssbenefitsmodal_components/RSBModal";

function MSSCard({ subscription, subscriptions, setSubscriptions }) {
  //STATO PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE IN CASO DI MODIFICA CON SUCCESSO
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE DI CANCELLAZIONE DELL'ABBONAMENTO
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE DI AGGIUNTA DI UN BENEFIT
  const [openAddBenefitModal, setOpenAddBenefitModal] = useState(false);

  //STATO PER POTER GESTIRE IL MODALE DI AGGIUNTA DI UN BENEFIT
  const [openRemoveBenefitModal, setOpenRemoveBenefitModal] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden border-2 border-black p-2 rounded-xl">
      <div className="flex flex-col justify-between flex-1">
        <div className="flex-1">
          <div className="block mt-2 space-y-6">
            <h3 className="text-4xl font-semibold leading-none tracking-tighter text-neutral-600">
              {subscription.name}
            </h3>
            <p className="text-2xl font-normal text-gray-500">
              €{subscription.price}/MESE
            </p>
            <p className="text-2xl font-normal text-gray-500">
              {subscription.description}
            </p>
            <ul className="text-lg font-normal text-gray-500">
              Benefits:
              {subscription.benefits.map((benefit, index) => {
                return (
                  <li className="flex" key={benefit + index}>
                    <TrainerSpecializationCheck />
                    <span>{benefit}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <ModifyButton setOpenModal={setOpenModal} />
      <DeleteButton setOpenDeleteModal={setOpenDeleteModal} />
      <div className="flex gap-2">
        <AddBenefitButton setOpenAddBenefitModal={setOpenAddBenefitModal} />
        <RemoveBenefitButton
          setOpenRemoveBenefitModal={setOpenRemoveBenefitModal}
        />
      </div>

      {/* MODALE PER MODIFICARE L'ABBONAMENTO */}
      {/* SI PASSANO COME PARAMETRI LA FUNZIONE PER MODIFICARE LO STATO DEL MODALE E L'OGGETTO CONTENENTE I DATI DELL'ABBONAMENTO */}
      {openModal && (
        <MSSModal
          subscription={subscription}
          setOpenModal={setOpenModal}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          setOpenModalSuccess={setOpenModalSuccess}
        />
      )}

      {/* MODALE PER LA CANCELLAZIONE DELL'ABBONAMENTO*/}
      {openDeleteModal && (
        <DSModal
          id={subscription._id}
          setOpenDeleteModal={setOpenDeleteModal}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
        />
      )}

      {/* MODALE PER AGGIUNGERE UN BENFIT */}
      {openAddBenefitModal && (
        <ANSBModal
          setOpenAddBenefitModal={setOpenAddBenefitModal}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          subscription={subscription}
          setOpenModalSuccess={setOpenModalSuccess}
        />
      )}

      {/* MODALE PER RIMUOVERE UN BENFIT */}
      {openRemoveBenefitModal && (
        <RSBModal
          setOpenRemoveBenefitModal={setOpenRemoveBenefitModal}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          subscription={subscription}
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

export default MSSCard;
