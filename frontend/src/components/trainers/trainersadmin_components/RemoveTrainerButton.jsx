import { useState } from "react";
import { deleteUser } from "../../../services/api";
import ConfirmRemoveAlert from "./ConfirmRemoveAlert";

function RemoveTrainerButton({ id, setTrainers, trainers }) {
  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI CONFERMA O ANNULLAMENTO DELLE RIMOZIONE DEL TRAINER
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="flex justify-center flex-col">
      {/* ALERT DI CONFERMA DI RIMOZIONE DEL TRAINER */}
      {/* SI PASSANO COME PARAMETRI: L'ID DEL TRAINER, LO STATO PER GESTIRE I TRAINER DELLA PAGINA CON ANNESSA FUNZIONE PER GESTIRLO E LA FUNZIONE PER GESTIRE LO STATO DELL'ALERT */}
      {openAlert && (
        <ConfirmRemoveAlert
          id={id}
          setTrainers={setTrainers}
          trainers={trainers}
          setOpenAlert={setOpenAlert}
        />
      )}
      {/* SE SI PREME IL BOTTONE DI RIMOZIONE TRAINER COMPARE L'ALERT PER CONFERMARE */}
      <button
        className="rounded-md text-white  p-3 font-bold lg:text-xl bg-red-700"
        onClick={() => setOpenAlert(true)}
      >
        Rimuovi Trainer
      </button>
    </div>
  );
}

export default RemoveTrainerButton;
