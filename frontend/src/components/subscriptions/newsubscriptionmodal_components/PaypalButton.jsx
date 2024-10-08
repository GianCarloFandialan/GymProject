import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../services/context";

function PaypalButton({ setOpenModal, subscriptionId }) {
  //VARIBAILI CHE MI SERVONO PER INSERIE LA DATA DI INIZIO DELLA SOTTOSCRIZIONE DELL'ABBONAMENTO
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (dd < 10) {
    dd = "0" + dd;
  }

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (mm < 10) {
    mm = "0" + mm;
  }

  var date = yyyy + "-" + mm + "-" + dd;

  //SI CREA UNO STATO PER POTER SALVARE IL PAGAMENTO VIA PAYPAL
  const [paypalData, setPaypalData] = useState({
    id: subscriptionId,
    start: "",
    method: {
      type: "paypal",
    },
  });

  //CREO UNO STATO PER POTERMI GESTIRE IL CARICAMENTO NEL FRATTEMPO CHE SI DEFINISCE LA DATA
  const [isLoading, setIsLoading] = useState(true);

  //USEEFFECT CHE AL CARICAMENTO DEL COMPONENTE AGGIORNA LO STATO DEL METODO DI PAGAMENTO
  useEffect(() => {
    setIsLoading(true);
    setPaypalData({ ...paypalData, start: date });
    setIsLoading(false);
  }, []);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //FUNZIONE PER GESTIRE IL CLICK DEL BOTTONE
  const handleClick = async () => {
    try {
      //EFFETTUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL METODO DI PAGAMENTO IN PAYPAL
      const response = updateUser(userData._id, paypalData);
      //SI AGGIORNANO I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO CON LA RISPOSTA ALLA CHIAMATA
      setUserData(response.data);
      //SI CHIUDE IL MODALE
      setOpenModal(false);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error(
        "Errore nell'aggiungere il metodo di pagamento in paypal: ",
        error
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        value="paypal"
        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer sr-only"
        id="paypal"
        onClick={handleClick}
      ></button>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&amp;:has([data-state=checked])]:border-primary text-white cursor-pointer"
        htmlFor="paypal"
      >
        <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
          <path
            d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
            fill="currentColor"
          ></path>
        </svg>
        Paypal
      </label>
    </div>
  );
}

export default PaypalButton;
