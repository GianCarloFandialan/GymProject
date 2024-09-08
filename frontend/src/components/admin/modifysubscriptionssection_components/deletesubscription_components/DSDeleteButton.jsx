import { deleteSubscription } from "../../../../services/api";

function DSDeleteButton({
  id,
  setOpenDeleteModal,
  subscriptions,
  setSubscriptions,
}) {
  //FUNZIONE PER GESITRE IL CLICK EL BOTTONE
  const handleClick = async () => {
    try {
      //SI EFFETTUA UNA RICHIESTA DELETE AL BACKEND PER CANCELLARE L'ABBONAMENTO SPECIFICO
      const response = await deleteSubscription(id);

      //SI CHIUDE IL MODALE DI CANCELLAZIONE
      setOpenDeleteModal(false);

      //SI AGGIORNANO I TRAINER DELLA PAGINA
      setSubscriptions(subscriptions.filter((trainer) => trainer._id !== id));
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella cancellazione dell'abbonamento: ", error);
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

export default DSDeleteButton;
