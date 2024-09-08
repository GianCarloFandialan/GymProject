import { deleteGym } from "../../../../services/api";

function DGDeleteButton({ id, setOpenDeleteModal, gyms, setGyms }) {
  //FUNZIONE PER GESITRE IL CLICK EL BOTTONE
  const handleClick = async () => {
    try {
      //SI EFFETTUA UNA RICHIESTA DELETE AL BACKEND PER CANCELLARE IL TRAINER SPECIFICO
      const response = await deleteGym(id);

      //SI CHIUDE IL MODALE DI CANCELLAZIONE
      setOpenDeleteModal(false);

      //SI AGGIORNANO I TRAINER DELLA PAGINA
      setGyms(gyms.filter((gym) => gym._id !== id));
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella cancellazione della palestra: ", error);
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

export default DGDeleteButton;
