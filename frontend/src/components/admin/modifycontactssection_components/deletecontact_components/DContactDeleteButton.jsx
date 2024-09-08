import { deleteContact } from "../../../../services/api";

function DContactDeleteButton({
  id,
  setOpenDeleteModal,
  contacts,
  setContacts,
}) {
  //FUNZIONE PER GESITRE IL CLICK EL BOTTONE
  const handleClick = async () => {
    try {
      //SI EFFETTUA UNA RICHIESTA DELETE AL BACKEND PER CANCELLARE IL CONTATTO SPECIFICO
      const response = await deleteContact(id);

      //SI CHIUDE IL MODALE DI CANCELLAZIONE
      setOpenDeleteModal(false);

      //SI AGGIORNANO I CONTATTI DELLA PAGINA
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella cancellazione del contatto: ", error);
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

export default DContactDeleteButton;
