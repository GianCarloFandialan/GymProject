import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { UserDataContext } from "../../../../services/context";
import AddNewTrainerModal from "./AddNewTrainerModal";
import NewTrainerModalSuccess from "./addnewtrainermodal_components/NewTrainerModalSuccess";

function AddTrainerContainer({ setTrainers, trainers }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI USA UNO STATO PER POTER GESTIRE LA PAGINA NEL CASO L'UTENTE CHE ABBIA FATTO L'ACCESSO SIA UN ADMIN
  const [isAdmin, setIsAdmin] = useState();

  //USEEFFECT CHE SI ATTIVA OGNI VOLTA CHE IL CONTEXT USERDATA SI MODIFICA
  useEffect(() => {
    if (userData.isAdmin) {
      setIsAdmin(true);
    } else setIsAdmin(false);
  }, [userData]);

  //FUNZIONE PER POTER GESTIRE IL MODALE
  const [openModal, setOpenModal] = useState(false);

  //SI CREA UNO STATO PER GESTIRE IL MODALE DELLA CONFERMA DEL NUOVO TRAINER
  const [newTrainerSuccessModal, setNewTrainerSuccessModal] = useState(false);

  return (
    <>
      {isAdmin ? (
        <>
          {/* // BOTTONE PER APRIRE IL MODALE NEL CASO L'ADMIN VOGLIA AGGIUNGERE UN
          NUOVO TRAINER ALLA PAGINA */}
          <div className="w-full flex justify-center mt-3">
            <button
              className="uppercase font-black text-xl border-2 border-black px-4 py-2 rounded-xl flex items-center"
              onClick={() => setOpenModal(true)}
            >
              aggiungi trainer <FaPlus className="ml-2" />
            </button>
          </div>

          {/* MODALE PER AGGIUNGERE UN NUOVO TRAINER */}
          {/* SI PASSANO COME PARAMETRI: LA FUNZIONE PER MODIFICARE LO STATO DI QUSTO MODALE, LO STATO PER GESRIRE I TRAINER E LA SUA FUNZIONE RELATIVA, FUNZIONE PER GESTIRE LO STATO CHE GESTISCE IL MODALE NEL CASO DI AGGIUNTA CON SUCCESSO DI UN TRAINER */}
          {openModal && (
            <AddNewTrainerModal
              setOpenModal={setOpenModal}
              setTrainers={setTrainers}
              trainers={trainers}
              setNewTrainerSuccessModal={setNewTrainerSuccessModal}
            />
          )}

          {/* MODLAE DI CONFERMA PER AVER AGGIUNTO UN NUOVO TRAINER */}
          {/* SI PASSA COME PARAMETRO LA FUNZIONE PER GESTIRE LO STATO CHE GESTISCE IL MODALE NEL CASO DI AGGIUNTA CON SUCCESSO DI UN TRAINER */}
          {newTrainerSuccessModal && (
            <NewTrainerModalSuccess
              setNewTrainerSuccessModal={setNewTrainerSuccessModal}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default AddTrainerContainer;
