import { useState } from "react";
import { createSubscription } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function ANSModalForm({
  setOpenModal,
  setSubscriptions,
  subscriptions,
  setOpenModalSuccess,
}) {
  //SI CREA UNO STATO PER POTERMI GESTIRE I DATI DEL NUOVO UTENTE CHE SI STA REGISTRANDO
  const [newSubscription, setNewSubscription] = useState({
    name: "",
    price: "",
    description: "",
    benefits: ["", "", ""],
  });

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //INIZIANO SEMPRE CON LA MAIUSCOLA
    setNewSubscription({
      ...newSubscription,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  }

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT DELLE SPECIALIZZAZIONI
  const handleBenefitChange = (e, index) => {
    //COPIA L'ARRAY specializationData
    const newBenefits = [...newSubscription.benefits];
    //AGGIORNA L'ELEMENTO ALL'INDICE SPECIFICO
    newBenefits[index] = e.target.value;
    //IMPOSTA IL NUOVO STATO
    setNewSubscription({ ...newSubscription, benefits: newBenefits });
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //EFFETTUA UNA RICHIESTA POST AL BACKEND PER CREARE UN NUOVO ABBONAMENTO
      const response = await createSubscription(newSubscription);

      //SI AGGIORNA LO STATO DI SUCCESSO NELL'AGGIUNTA DEL NUOVO ABBONAMENTO
      setOpenModalSuccess(true);

      //SI CHIUDE IL MODALE DEL FORM
      setOpenModal(false);

      //SI AGGIORNA I TRAINERS DELLA PAGINA CON IL NUOVO ABBONAMENTO
      setSubscriptions([...subscriptions, response.data]);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella registrazione dell'abbonamento: ", error);
      setErrorAlert(true);
    }
  };

  return (
    <>
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="p-6 pt-0 grid gap-6">
          {/* INPUT PER IL NOME */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"name"}
            content={"Nome"}
            handleChange={handleChange}
            value={newSubscription.name}
          />

          {/* INPUT PER IL PREZZO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO ABBONAMENTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"price"}
            content={"Prezzo"}
            handleChange={handleChange}
            value={newSubscription.price}
          />

          {/* INPUT PER LA DESCRIZIONE */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO ABBONAMENTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"description"}
            content={"Descrzione"}
            handleChange={handleChange}
            value={newSubscription.description}
          />

          {newSubscription.benefits.map((benefit, index) => {
            return (
              <ModifyInput
                element={`benefit-${index}`}
                content={`Benefit n. ${index + 1}`}
                value={newSubscription.benefits[index]}
                handleChange={(e) => handleBenefitChange(e, index)} //PASSA L'INDICE CORRETTO
                key={`Benefit n. ${index + 1}`}
              />
            );
          })}
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Aggiungi"} />
      </form>
    </>
  );
}

export default ANSModalForm;
