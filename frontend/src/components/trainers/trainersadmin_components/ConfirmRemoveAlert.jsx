import { deleteUser } from "../../../services/api";

function ConfirmRemoveAlert({ id, setTrainers, trainers, setOpenAlert }) {
  //FUNZIONE PER GESTIRE IL CLICK DEL BOTTONE
  const handleConfirm = async () => {
    try {
      //EFFETTUA UNA RICHIESTA DELETE AL BACKEND PER RIMUOVERE IL TRAINER
      const response = await deleteUser(id);

      //CHIUDO L'ALERT DI CONFERMA RIMOZIONE
      setOpenAlert(false);

      //SI AGGIORNA I TRAINER NELLA PAGINA
      setTrainers(trainers.filter((trainer) => trainer._id !== id));
      console.log(trainers.filter((trainer) => trainer._id !== id));
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella fetch dei trainers: ", error);
    }
  };

  return (
    <div className="items-center mb-4">
      <div className="p-3  rounded-xl bg-red-700">
        <div className="flex justify-center">
          <div className="">
            <h3 className="font-medium text-white text-2xl text-center">
              Sei sicuro di voler rimuovere il Trainer?
            </h3>
            <div className="mt-2 flex justify-center">
              <div className="-mx-2 -my-1.5 flex">
                {/* SE SI PREME QUESTO BOTTONE, L'ALERT SI CHIUDE E BASTA */}
                <button
                  type="button"
                  className="bg-red-50 px-2 py-1 rounded-md text-lg font-bold text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600 border-2 border-red-800"
                  onClick={() => setOpenAlert(false)}
                >
                  Annulla
                </button>
                {/* AL CLICK SU QUESTO BOTTONE SI RIMUOVE L'ALERT E ANCHE IL TRAINER DALLA PAGINA */}
                <button
                  type="button"
                  className="ml-3 bg-red-50 px-2 py-1 rounded-md text-lg font-bold text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600 border-2 border-red-800"
                  onClick={handleConfirm}
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRemoveAlert;
