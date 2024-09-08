import { useState } from "react";
import { createContact } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function ANContactModalForm({
  setOpenModal,
  setContacts,
  contacts,
  setOpenModalSuccess,
}) {
  //SI CREA UNO STATO PER POTERMI GESTIRE I DATI DEL NUOVO UTENTE CHE SI STA REGISTRANDO
  const [newContact, setNewContact] = useState({
    answer: "",
    question: "",
  });

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //INIZIANO SEMPRE CON LA MAIUSCOLA
    setNewContact({
      ...newContact,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  }

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //EFFETTUA UNA RICHIESTA POST AL BACKEND PER CREARE UN NUOVO CONTATTO
      const response = await createContact(newContact);

      //SI AGGIORNA LO STATO DI SUCCESSO NELL'AGGIUNTA DEL NUOVO CONTATTO
      setOpenModalSuccess(true);

      //SI CHIUDE IL MODALE DEL FORM
      setOpenModal(false);

      //SI AGGIORNA I TRAINERS DELLA PAGINA CON IL NUOVO CONTATTO
      setContacts([...contacts, response.data]);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella registrazione del contatto: ", error);
      setErrorAlert(true);
    }
  };

  return (
    <>
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="p-6 pt-0 grid gap-6">
          {/* INPUT PER LA DOMANDA */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"question"}
            content={"Domanda"}
            handleChange={handleChange}
            value={newContact.question}
          />

          {/* INPUT PER LA RISPOSTA */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO CONTATTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"answer"}
            content={"Risposta"}
            handleChange={handleChange}
            value={newContact.answer}
          />
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Aggiungi"} />
      </form>
    </>
  );
}

export default ANContactModalForm;
