import { useState } from "react";
import Label from "../../../universals/forms_components/Label";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import { updateUser, updateUserAvatar } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModifyInput from "../../admin_universal_components/ModifyInput";

function MTSModalForm({
  trainer,
  setOpenModal,
  setTrainers,
  trainers,
  setOpenModalSuccess,
}) {
  //STATO PER GESITRE I DATI DEL FORM
  const [trainerData, setTrainerData] = useState(trainer);

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //NOME E COGNOME INIZIANO SEMPRE CON LA MAIUSCOLA
    setTrainerData({
      ...trainerData,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    });
  }

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT DELLE SPECIALIZZAZIONI
  const handleSpecializationChange = (e, index) => {
    //COPIA L'ARRAY specializationData
    const newSpecializations = [...trainerData.spcialization];
    //AGGIORNA L'ELEMENTO ALL'INDICE SPECIFICO
    newSpecializations[index] = e.target.value;
    //IMPOSTA IL NUOVO STATO
    setTrainerData({ ...trainerData, spcialization: newSpecializations });
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

    if (avatarFile) {
      try {
        const formData = new FormData();

        //SI AGGIUNGONO I VARI DATI CHE SERVONO AFFINCHE SI MODIFICHI CORRETTAMENTE IL TRAINER
        Object.keys(trainerData).forEach((key) =>
          formData.append(key, trainerData[key])
        );

        //SI AGGIUNGE ANCHE LA FOTO DEL TRAINER
        if (avatarFile) {
          formData.append("avatar", avatarFile);
        }

        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
        const response = await updateUserAvatar(trainer._id, formData);

        console.log(response.data);

        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
        const finalResponse = await updateUser(trainer._id, {
          ...response.data,
          spcialization: trainerData.spcialization,
        });

        //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DEL TRAINER
        setOpenModalSuccess(true);

        //SI AGGIORNA IL TRAINER DELLA PAGINA CON IL TRAINER MODIFICATO
        setTrainers(
          trainers.map((trainer) =>
            trainer._id === finalResponse.data._id
              ? finalResponse.data
              : trainer
          )
        );

        //SI CHIUDE IL MODALE DEL FORM
        setOpenModal(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella modifica dell'utente: ", error);
        setErrorAlert(true);
      }
    } else {
      try {
        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
        const response = await updateUser(trainer._id, trainerData);

        //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DELLA CLASSE
        setOpenModalSuccess(true);

        //SI AGGIORNA LA PAGINA CON IL TRAINER MODIFICATO
        setTrainers(
          trainers.map((trainer) =>
            trainer._id === response.data._id ? response.data : trainer
          )
        );

        //SI CHIUDE IL MODALE DEL FORM
        setOpenModal(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella modifica dell'utente: ", error);
        setErrorAlert(true);
      }
    }
  };

  return (
    <>
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="p-6 pt-0 grid gap-6">
          {/* INPUT PER IL NOME */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"nome"}
            content={"Nome"}
            handleChange={handleChange}
            value={trainerData.nome}
          />

          {/* INPUT PER IL COGNOME */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"cognome"}
            content={"Cognome"}
            handleChange={handleChange}
            value={trainerData.cognome}
          />

          {trainerData.spcialization.map((specialization, index) => {
            return (
              <ModifyInput
                element={`specialization-${index}`}
                content={`Specializzazione n. ${index + 1}`}
                value={trainerData.spcialization[index]}
                handleChange={(e) => handleSpecializationChange(e, index)} //PASSA L'INDICE CORRETTO
                key={`Specializzazione n. ${index + 1}`}
              />
            );
          })}

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
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Modifica"} />
      </form>
    </>
  );
}

export default MTSModalForm;
