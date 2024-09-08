import { useState } from "react";
import Label from "../../../universals/forms_components/Label";
import { createUser, updateUser } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function ANTModalForm({
  setOpenModal,
  setTrainers,
  trainers,
  setOpenModalSuccess,
}) {
  //SI CREA UNO STATO PER POTERMI GESTIRE I DATI DEL NUOVO UTENTE CHE SI STA REGISTRANDO
  const [newTrainer, setNewTrainer] = useState({
    nome: "",
    cognome: "",
    password: "Trainer123",
    spcialization: ["", "", ""],
  });

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //NOME E COGNOME INIZIANO SEMPRE CON LA MAIUSCOLA
    setNewTrainer({
      ...newTrainer,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  }

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT DELLE SPECIALIZZAZIONI
  const handleSpecializationChange = (e, index) => {
    //COPIA L'ARRAY specializationData
    const newSpecializations = [...newTrainer.spcialization];
    //AGGIORNA L'ELEMENTO ALL'INDICE SPECIFICO
    newSpecializations[index] = e.target.value;
    //IMPOSTA IL NUOVO STATO
    setNewTrainer({ ...newTrainer, spcialization: newSpecializations });
  };

  //SI CREA UNO STATO PER POTERMI GESTIRE IL FILE CARICATO
  const [avatarFile, setAvatarFile] = useState(null);

  //SI GESTISCE IL CARICAMENTO DEL FILE DELL'IMMAGINE
  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      //SI AGGIUNGONO I VARI DATI CHE SERVONO AFFINCHE SI CREI CORRETTAMENTE IL NUOVO TRAINER
      Object.keys(newTrainer).forEach((key) =>
        formData.append(key, newTrainer[key])
      );
      formData.append(
        "email",
        `${newTrainer.nome}.${newTrainer.cognome}@gymproject.com`
      );
      formData.append("isTrainer", true);

      //SI AGGIUNGE ANCHE LA FOTO DEL TRAINER
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      //EFFETTUA UNA RICHIESTA POST AL BACKEND PER CREARE UN NUOVO UTENTE
      const response = await createUser(formData);

      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
      const finalResponse = await updateUser(response.data._id, {
        ...response.data,
        spcialization: newTrainer.spcialization,
      });

      //SI AGGIORNA LO STATO DI SUCCESSO NELL'AGGIUNTA DEL NUOVO TRAINER
      setOpenModalSuccess(true);

      //SI CHIUDE IL MODALE DEL FORM
      setOpenModal(false);

      //SI AGGIORNA I TRAINERS DELLA PAGINA CON IL NUOVO TRAINER
      setTrainers([...trainers, finalResponse.data]);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella registrazione dell'utente: ", error);
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
            element={"nome"}
            content={"Nome"}
            handleChange={handleChange}
            value={newTrainer.nome}
          />

          {/* INPUT PER IL COGNOME */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"cognome"}
            content={"Cognome"}
            handleChange={handleChange}
            value={newTrainer.cognome}
          />

          <div className="grid gap-2">
            <Label html={"avatar"} content={"Foto Trainer"} />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white cursor-pointer text-center"
              id={"avatar"}
              placeholder={"Inserisci una foto del trainer"}
              name={"avatar"}
              type="file"
              onChange={handleFileChange}
            />
          </div>

          {/* INPUT DOVE SI INSERISCONO LE TE SPECIALIZZAZIONI DEL TRAINER */}
          {newTrainer.spcialization.map((specialization, index) => {
            return (
              <ModifyInput
                element={`specialization-${index}`}
                content={`Specializzazione n. ${index + 1}`}
                value={newTrainer.spcialization[index]}
                handleChange={(e) => handleSpecializationChange(e, index)} //PASSA L'INDICE CORRETTO
                key={`Specializzazione n. ${index + 1}`}
              />
            );
          })}
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Aggiungi"} />
      </form>
    </>
  );
}

export default ANTModalForm;
