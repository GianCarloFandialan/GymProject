import { useState } from "react";
import { updateUser } from "../../../services/api";
import ChangeSuccessAlert from "../../universals/alerts/ChangeSuccessAlert";
import ChangeErrorAlert from "../../universals/alerts/ChangeErrorAlert";
import TrainerSpecializationCheck from "../trainersection_components/TrainerSpecializationCheck";

function ChangeSpecializationsForm({
  specializations,
  setCurrentTrainer,
  currentTrainer,
}) {
  //SI CREA UNO STATO PER POTER GESTIRE I DATI DEL FORM
  const [specializationData, setSpecializationData] = useState(specializations);

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT
  const handleChange = (e, index) => {
    //COPIA L'ARRAY specializationData
    const newSpecializations = [...specializationData];
    //AGGIORNA L'ELEMENTO ALL'INDICE SPECIFICO
    newSpecializations[index] = e.target.value;
    //IMPOSTA IL NUOVO STATO
    setSpecializationData(newSpecializations);
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI MODIFICA CON SUCCESSO
  const [successAlert, setSuccessAlert] = useState(false);

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI MODIFICA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER POTER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL TRAINER
      const response = await updateUser(currentTrainer._id, {
        ...currentTrainer,
        spcialization: specializationData,
      });
      console.log(response.data);

      //SI AGGIORNA LO STATO DEL TRAINER SCELTO CON LA RISPOSTA ALLA CHIAMATA
      setCurrentTrainer(response.data);
      //SI AGGIORNA LO STATO DELL'ALERT PER CONFERMARE ALL'UTENTE LA MODIFICA
      setSuccessAlert(true);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nell'aggiornamento della trainer: ", error);
      //SI AGGIORNA LO STATO DELL'ALERT PER RIFERIRE ALL'UTENTE DELL'ERRORE
      setErrorAlert(true);
    }
  };

  return (
    <form
      className="pt-6 my-6 space-y-6 border-t w-full"
      onSubmit={handleSubmit}
    >
      {/* NEL CASO DI MODIFICA CON SUCCESSO COMPARE L'ALERT DI MODIFICA SUCCESSO */}
      {successAlert && <ChangeSuccessAlert setSuccessAlert={setSuccessAlert} />}
      {/* NEL CASO DI ERRORE DI MODIFICA COMPARE L'ALERT DI ERRORE NELLA MODIFICA */}
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      {specializations.map((specialization, index) => {
        return (
          <div className="flex items-center gap-2" key={specialization + index}>
            <TrainerSpecializationCheck />
            <input
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ml-3 text-white lg:text-2xl"
              id={`specialization-${index}`} //id reso unico per ogni input
              placeholder={specialization}
              required
              name="name"
              value={specializationData[index]}
              onChange={(e) => handleChange(e, index)} //PASSA L'INDICE CORRETTO
            />
          </div>
        );
      })}
      <div className="flex justify-center">
        <button className="border rounded-md mt-4 bg-white p-1 font-bold lg:text-xl ">
          Modifica Specializzazioni
        </button>
      </div>
    </form>
  );
}

export default ChangeSpecializationsForm;
