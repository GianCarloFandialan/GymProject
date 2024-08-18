import { useState } from "react";
import CardCVC from "../../../subscriptions/newsubscriptionmodal_components/form_components/CardCVC";
import CardExpireMonth from "../../../subscriptions/newsubscriptionmodal_components/form_components/CardExpireMonth";
import CardExpireYear from "../../../subscriptions/newsubscriptionmodal_components/form_components/CardExpireYear";
import Label from "../../../subscriptions/newsubscriptionmodal_components/form_components/Label";
import RegisterCardNumber from "./RSMForm_components/RegisterCardNumber";
import RSMFormSubmitButton from "./RSMForm_components/RSMFormSubmitButton";

function RSMForm({ setOpenModal, newUser, setNewUser }) {
  //SI CREA UNO STATO PER POTER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    setNewUser({
      ...newUser,
      Subscription: {
        ...newUser.Subscription,
        method: { type: "card", CardNumber: card },
      },
    });

    setOpenModal(false);
  };

  //SI CREA UNO STATO PER POTER GESTIRE IL NUMERO DELLA CARTA
  const [card, setCard] = useState("");

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
        <RegisterCardNumber card={card} setCard={setCard} />
        <div className="grid grid-cols-3 gap-4">
          <CardExpireYear />
          <CardExpireMonth />
          <CardCVC />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <RSMFormSubmitButton />
      </div>
    </form>
  );
}

export default RSMForm;
