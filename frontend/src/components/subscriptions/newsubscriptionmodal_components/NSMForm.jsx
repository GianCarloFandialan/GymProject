import { useContext, useState } from "react";
import CardCVC from "./form_components/CardCVC";
import CardExpireMonth from "./form_components/CardExpireMonth";
import CardExpireYear from "./form_components/CardExpireYear";
import Label from "./form_components/Label";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = updateUser(userData._id, cardData);
      //console.log(response);
      setOpenModal(false);
    } catch (error) {
      //SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella fetch delle classi:", error);
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
        <CardNumber cardData={cardData} setCardData={setCardData} />
        <div className="grid grid-cols-3 gap-4">
          <CardExpireYear />
          <CardExpireMonth />
          <CardCVC />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <SubmitButton cardData={cardData} setCardData={setCardData} />
      </div>
    </form>
  );
}

export default NSMForm;
