import { useContext, useState } from "react";
import CardCVC from "./form_components/CardCVC";
import CardExpireMonth from "./form_components/CardExpireMonth";
import CardExpireYear from "./form_components/CardExpireYear";
import Label from "../../universals/forms_components/Label";
import SubmitButton from "./form_components/SubmitButton";
import CardNumber from "./form_components/CardNumber";
import { updateUser } from "../../../services/api";
import { UserDataContext } from "../../../services/context";

function NSMForm({ setOpenModal, subscriptionId }) {
  //SI CREA UNO STTO PER POTER GESTIRE I DATI DELLA CARTA
  const [cardData, setCardData] = useState({
    id: subscriptionId,
    start: "",
    method: {
      type: "card",
      CardNumber: "",
    },
  });

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //EFFETTUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL METODO DI PAGAMENTO IN CARD
      const response = updateUser(userData._id, cardData);
      //SI AGGIORNANO I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO CON LA RISPOSTA ALLA CHIAMATA
      setUserData(response.data);
      //SI CHIUDE IL MODALE
      setOpenModal(false);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error(
        "Errore nell'aggiungere il metodo di pagamento in card: ",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 pt-0 grid gap-6">
        <div className="grid gap-2">
          <Label html={"name"} content={"Nome"} />
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            id="name"
            placeholder="Inserisci il nome"
            required
          />
        </div>
        {/* INPUT IN CUI SI INSERISCE IL NUMERO DELLA CARTA */}
        {/* SI PASSANO COME PARAMETRI LO STATO DELLA CARD E LA RELATIVA FUNZIONE */}
        <CardNumber cardData={cardData} setCardData={setCardData} />
        <div className="grid grid-cols-3 gap-4">
          {/* INPUNT IN CUI INSERIRE L'ANNO DI SCADENZA DELLA CARTA */}
          <CardExpireYear />
          {/* INPUNT IN CUI INSERIRE IL MESE DI SCANDENZA DELLA CARTA */}
          <CardExpireMonth />
          {/* INPUNT IN CUI INSERIRE IL CVC */}
          <CardCVC />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        {/* BOTTONE DI SUBMIT DEL FORM */}
        {/* SI PASSANO COME PARAMETRI LO STATO DELLA CARD E LA RELATIVA FUNZIONE */}
        <SubmitButton cardData={cardData} setCardData={setCardData} />
      </div>
    </form>
  );
}

export default NSMForm;
