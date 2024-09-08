import { useState } from "react";
import ModifyInput from "../../../admin_universal_components/ModifyInput";
import { updateSubscription } from "../../../../../services/api";
import ModalButtonSection from "../../../../universals/forms_components/ModalButtonSection";
import ChangeErrorAlert from "../../../../universals/alerts/ChangeErrorAlert";

function ANSBModalForm({
  subscription,
  setOpenAddBenefitModal,
  setSubscriptions,
  subscriptions,
  setOpenModalSuccess,
}) {
  //STATO PER GESITRE I DATI DEL FORM
  const [newBenefitData, setNewBenefitData] = useState("");

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE L'ABBONAMENTO
      const response = await updateSubscription(subscription._id, {
        ...subscription,
        benefits: [...subscription.benefits, newBenefitData],
      });

      //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DELL'ABBONAMENTO
      setOpenModalSuccess(true);

      //SI AGGIORNA LA PAGINA CON L'ABBOANAMENTO MODIFICATO
      setSubscriptions(
        subscriptions.map((subscription) =>
          subscription._id === response.data._id ? response.data : subscription
        )
      );

      //SI CHIUDE IL MODALE DEL FORM
      setOpenAddBenefitModal(false);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella modifica dell'abbonamento: ", error);
      setErrorAlert(true);
    }
  };

  return (
    <>
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="p-6 pt-0 grid gap-6">
          {/* INPUT PER IL NOME */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO ABBONAMENTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"newBenefitData"}
            content={"Benefit"}
            handleChange={(e) => setNewBenefitData(e.target.value)}
            value={newBenefitData}
          />
        </div>

        <div className="flex items-center p-6 pt-0 gap-2">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-white"
            onClick={() => setOpenAddBenefitModal(false)}
          >
            Annulla
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-white"
            type="submit"
          >
            Aggiungi
          </button>
        </div>
      </form>
    </>
  );
}

export default ANSBModalForm;
