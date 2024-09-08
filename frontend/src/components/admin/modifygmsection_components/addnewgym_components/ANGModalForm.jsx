import { useState } from "react";
import Label from "../../../universals/forms_components/Label";
import { createGym, createUser, updateUser } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function ANGModalForm({ setOpenModal, setGyms, gyms, setOpenModalSuccess }) {
  //SI CREA UNO STATO PER POTERMI GESTIRE I DATI DEL NUOVO UTENTE CHE SI STA REGISTRANDO
  const [newGym, setNewGym] = useState({
    name: "",
    address: "",
    hours: "",
    tel: "",
  });

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //IL NOME DELLA PALESTRA è SEMPRE TUTTO IN MAIUSCOLO MENTRE TUTTO IL RESTO LO TENGO COSI
    if (name == "name") {
      setNewGym({
        ...newGym,
        [name]: value.toUpperCase(),
      });
    } else {
      setNewGym({
        ...newGym,
        [name]: [value],
      });
    }
  }

  //SI CREA UNO STATO PER POTERMI GESTIRE IL FILE CARICATO
  const [coverFile, setCoverFile] = useState(null);

  //SI GESTISCE IL CARICAMENTO DEL FILE DELL'IMMAGINE
  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      //SI AGGIUNGONO I VARI DATI CHE SERVONO AFFINCHE SI CREI CORRETTAMENTE IL NUOVO TRAINER
      Object.keys(newGym).forEach((key) => formData.append(key, newGym[key]));

      //SI AGGIUNGE ANCHE LA FOTO DEL TRAINER
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      //EFFETTUA UNA RICHIESTA POST AL BACKEND PER CREARE UN NUOVO UTENTE
      const response = await createGym(formData);

      //SI AGGIORNA LO STATO DI SUCCESSO NELL'AGGIUNTA DEL NUOVO TRAINER
      setOpenModalSuccess(true);

      //SI CHIUDE IL MODALE DEL FORM
      setOpenModal(false);

      //SI AGGIORNA I TRAINERS DELLA PAGINA CON IL NUOVO TRAINER
      setGyms([...gyms, response.data]);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella creazione della nuova palestra: ", error);
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
            value={newGym.name}
          />

          {/* INPUT PER L'ORARIO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"hours"}
            content={"Orario"}
            handleChange={handleChange}
            value={newGym.hours}
          />

          {/* INPUT PER IL NUMERO DI TELEFONO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"tel"}
            content={"Telefono"}
            handleChange={handleChange}
            value={newGym.tel}
          />

          {/* INPUT PER L'INDIRIZZO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"address"}
            content={"Indirizzo"}
            handleChange={handleChange}
            value={newGym.address}
          />

          <div className="grid gap-2">
            <Label html={"cover"} content={"Foto Palestra"} />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white cursor-pointer text-center"
              id={"cover"}
              placeholder={"Inserisci una foto della palestra"}
              name={"cover"}
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Aggiungi"} />
      </form>
    </>
  );
}

export default ANGModalForm;
