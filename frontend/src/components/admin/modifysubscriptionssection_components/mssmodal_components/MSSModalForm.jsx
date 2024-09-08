import { useState } from "react";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import { updateSubscription } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function MSSModalForm({
  subscription,
  setOpenModal,
  setSubscriptions,
  subscriptions,
  setOpenModalSuccess,
}) {
  //STATO PER GESITRE I DATI DEL FORM
  const [subscriptionData, setSubscriptionData] = useState(subscription);

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //SI AGGIORNA LO STATO
    setSubscriptionData({
      ...subscriptionData,
      [name]: value,
    });
  }

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT DEI BENEFIT
  const handleBenefitChange = (e, index) => {
    //COPIA L'ARRAY specializationData
    const newBenefits = [...subscriptionData.benefits];
    //AGGIORNA L'ELEMENTO ALL'INDICE SPECIFICO
    newBenefits[index] = e.target.value;
    //IMPOSTA IL NUOVO STATO
    setSubscriptionData({
      ...subscriptionData,
      benefits: newBenefits,
    });
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE L'ABBONAMENTO
      const response = await updateSubscription(
        subscription._id,
        subscriptionData
      );

      //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DELL'ABBONAMENTO
      setOpenModalSuccess(true);

      //SI AGGIORNA LA PAGINA CON L'ABBOANAMENTO MODIFICATO
      setSubscriptions(
        subscriptions.map((subscription) =>
          subscription._id === response.data._id ? response.data : subscription
        )
      );

      //SI CHIUDE IL MODALE DEL FORM
      setOpenModal(false);
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
            element={"name"}
            content={"Nome"}
            handleChange={handleChange}
            value={subscriptionData.name}
          />

          {/* INPUT PER IL PREZZO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO ABBONAMENTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"price"}
            content={"Prezzo"}
            handleChange={handleChange}
            value={subscriptionData.price}
          />

          {/* INPUT PER LA DESCRIZIONE */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO ABBONAMENTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"description"}
            content={"Descrzione"}
            handleChange={handleChange}
            value={subscriptionData.description}
          />

          {subscriptionData.benefits.map((benefit, index) => {
            return (
              <ModifyInput
                element={`benefit-${index}`}
                content={`Benefit n. ${index + 1}`}
                value={subscriptionData.benefits[index]}
                handleChange={(e) => handleBenefitChange(e, index)} //PASSA L'INDICE CORRETTO
                key={`Benefit n. ${index + 1}`}
              />
            );
          })}
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Modifica"} />
      </form>
    </>
  );
}

export default MSSModalForm;
