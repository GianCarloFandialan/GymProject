import { useState } from "react";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import { updateContact } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function MContactsSModalForm({
  contact,
  setOpenModal,
  setContacts,
  contacts,
  setOpenModalSuccess,
}) {
  //STATO PER GESITRE I DATI DEL FORM
  const [contactsData, setContactData] = useState(contact);

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //SI AGGIORNA LO STATO
    setContactData({
      ...contactsData,
      [name]: value,
    });
  }

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE CONTATTO
      const response = await updateContact(contact._id, contactsData);

      //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DEL CONTATTO
      setOpenModalSuccess(true);

      //SI AGGIORNA LA PAGINA CON L'ABBOANAMENTO MODIFICATO
      setContacts(
        contacts.map((contact) =>
          contact._id === response.data._id ? response.data : contact
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
          {/* INPUT PER LA DOMANDA*/}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO CONTATTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"question"}
            content={"Domanda"}
            handleChange={handleChange}
            value={contactsData.question}
          />

          {/* INPUT PER LA RISPOSTA */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO CONTATTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"answer"}
            content={"Risposta"}
            handleChange={handleChange}
            value={contactsData.answer}
          />
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Modifica"} />
      </form>
    </>
  );
}

export default MContactsSModalForm;
