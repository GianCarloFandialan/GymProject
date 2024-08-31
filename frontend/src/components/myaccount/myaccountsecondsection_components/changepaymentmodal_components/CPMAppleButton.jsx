import { useContext } from "react";
import { UserDataContext } from "../../../../services/context";
import { updateUser } from "../../../../services/api";

function CPMAppleButton({ setOpenModal }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI CREA UNA FUNZIONE PER POTER GESTIRE IL CLICK DEL BOTTONE
  const handleClick = async () => {
    try {
      //EFFETTUA UNA RICHIESTA PUT AL BACKEND PER OTTENERE AGGIORNARE IL METODO DI PAGAMENTO IN APPLE PAY
      const response = await updateUser(userData._id, {
        ...userData,
        Subscription: {
          ...userData.Subscription,
          method: { type: "appplepay" },
        },
      });
      //SI AGGIORNANO I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO CON LA RISPOSTA ALLA CHIAMATA
      setUserData(response.data);
      //SI CHIUDE IL MODALE
      setOpenModal(false);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error(
        "Errore nell'aggiornamento del metodo di pagamento in apple pay: ",
        error
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        role="radio"
        value="apple"
        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
        id="apple"
        onClick={handleClick}
      ></button>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary text-white cursor-pointer"
        htmlFor="apple"
      >
        <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
          <path
            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
            fill="currentColor"
          ></path>
        </svg>
        Apple
      </label>
    </div>
  );
}

export default CPMAppleButton;
