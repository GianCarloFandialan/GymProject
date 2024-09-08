import { useState } from "react";
import { updateGym, updateGymCover } from "../../../../services/api";
import ChangeErrorAlert from "../../../universals/alerts/ChangeErrorAlert";
import ModifyInput from "../../admin_universal_components/ModifyInput";
import Label from "../../../universals/forms_components/Label";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";

function MGSModalForm({
  gym,
  setOpenModal,
  setGyms,
  gyms,
  setOpenModalSuccess,
}) {
  //STATO PER GESITRE I DATI DEL FORM
  const [gymData, setGymData] = useState(gym);

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //NOME E COGNOME INIZIANO SEMPRE CON LA MAIUSCOLA
    setGymData({
      ...gymData,
      [name]: value,
    });
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

    if (coverFile) {
      try {
        const formData = new FormData();

        //SI AGGIUNGONO I VARI DATI CHE SERVONO AFFINCHE SI MODIFICHI CORRETTAMENTE LA CLASSE
        Object.keys(gymData).forEach((key) =>
          formData.append(key, gymData[key])
        );

        //SI AGGIUNGE ANCHE LA FOTO DEL TRAINER
        if (coverFile) {
          formData.append("cover", coverFile);
        }

        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
        const response = await updateGymCover(gym._id, formData);

        console.log(response.data);

        //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DELLA CLASSE
        setOpenModalSuccess(true);

        //SI AGGIORNA LE CLASSI DELLA PAGINA CON LA CLASSE MODIFICATA
        setGyms(
          gyms.map((gym) =>
            gym._id === response.data._id ? response.data : gym
          )
        );

        //SI CHIUDE IL MODALE DEL FORM
        setOpenModal(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella modifica della palestra: ", error);
        setErrorAlert(true);
      }
    } else {
      try {
        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
        const response = await updateGym(gym._id, gymData);

        //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DELLA CLASSE
        setOpenModalSuccess(true);

        //SI AGGIORNA LE CLASSI DELLA PAGINA CON LA CLASSE MODIFICATA
        setGyms(
          gyms.map((gym) =>
            gym._id === response.data._id ? response.data : gym
          )
        );

        //SI CHIUDE IL MODALE DEL FORM
        setOpenModal(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella modifica della palestra: ", error);
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
            element={"name"}
            content={"Nome"}
            handleChange={handleChange}
            value={gymData.name}
          />

          {/* INPUT PER L'ORARIO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"hours"}
            content={"Orario"}
            handleChange={handleChange}
            value={gymData.hours}
          />

          {/* INPUT PER IL NUMERO DI TELEFONO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"tel"}
            content={"Telefono"}
            handleChange={handleChange}
            value={gymData.tel}
          />

          {/* INPUT PER L'INDIRIZZO */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO TRAINER CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"address"}
            content={"Indirizzo"}
            handleChange={handleChange}
            value={gymData.address}
          />

          <div className="grid gap-2">
            <Label html={"cover"} content={"Foto Palestra"} />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white cursor-pointer text-center"
              id={"cover"}
              placeholder={"Inserisci una foto della palestra gym"}
              name={"cover"}
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

export default MGSModalForm;
