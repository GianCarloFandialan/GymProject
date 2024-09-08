import { deleteUser } from "../../../../services/api";

function DTDeleteButton({ id, setOpenDeleteModal, trainers, setTrainers }) {
  //FUNZIONE PER GESITRE IL CLICK EL BOTTONE
  const handleClick = async () => {
    try {
      //SI EFFETTUA UNA RICHIESTA DELETE AL BACKEND PER CANCELLARE IL TRAINER SPECIFICO
      const response = await deleteUser(id);

      //SI CHIUDE IL MODALE DI CANCELLAZIONE
      setOpenDeleteModal(false);

      //SI AGGIORNANO I TRAINER DELLA PAGINA
      setTrainers(trainers.filter((trainer) => trainer._id !== id));
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella cancellazione del trainer: ", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white hover:opacity-90 transition-opacity text-red-700 font-semibold w-full py-2 rounded"
    >
      Elimina
    </button>
  );
}

export default DTDeleteButton;
