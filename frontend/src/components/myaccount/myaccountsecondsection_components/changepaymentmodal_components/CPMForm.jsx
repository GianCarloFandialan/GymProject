import { useContext, useState } from "react";
import CardCVC from "../../../subscriptions/newsubscriptionmodal_components/form_components/CardCVC";
import CardExpireMonth from "../../../subscriptions/newsubscriptionmodal_components/form_components/CardExpireMonth";
import CardExpireYear from "../../../subscriptions/newsubscriptionmodal_components/form_components/CardExpireYear";
import Label from "../../../subscriptions/newsubscriptionmodal_components/form_components/Label";
import CPMCardNumber from "./changepaymentmodalform_components/CPMCardNumber";
import CPMSubmitButton from "./changepaymentmodalform_components/CPMSubmitButton";
import { UserDataContext } from "../../../../services/context";
import { updateUser } from "../../../../services/api";

function CPMForm({ setOpenModal }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI CREA UNO STATO PER GESTIRE IL VALORE DEL NUMERO DELLA CARTA
  const [number, setNumber] = useState("");

  //SI CREA UNA FUNZIONE PER POTER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(userData._id, {
        ...userData,
        Subscription: {
          ...userData.Subscription,
          method: { type: "card", cardNumber: number },
        },
      });
      console.log(response.data);
      setUserData(response.data);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
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
        <CPMCardNumber number={number} setNumber={setNumber} />
        <div className="grid grid-cols-3 gap-4">
          <CardExpireYear />
          <CardExpireMonth />
          <CardCVC />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <CPMSubmitButton />
      </div>
    </form>
  );
}

export default CPMForm;
