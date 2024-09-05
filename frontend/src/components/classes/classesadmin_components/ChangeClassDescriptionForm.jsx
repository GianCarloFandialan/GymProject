import { useEffect, useState } from "react";
import Label from "../../universals/forms_components/Label";
import { updateClass } from "../../../services/api";
import ChangeSuccessAlert from "../../universals/alerts/ChangeSuccessAlert";
import ChangeErrorAlert from "../../universals/alerts/ChangeErrorAlert";

function ChangeClassDescriptionForm({ currentLesson, setCurrentLesson }) {
  //SI CREA UNO STATO PER POTER GESTIRE I DATI DEL FORM
  const [lessonData, setLessonData] = useState(currentLesson);

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLessonData({
      ...lessonData,
      [name]: value,
    });
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI MODIFICA CON SUCCESSO
  const [successAlert, setSuccessAlert] = useState(false);

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI MODIFICA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER POTER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE L'IMMAGINE DI COPERTINA DELLA LEZIONE
      const response = await updateClass(currentLesson._id, lessonData);
      //AGGIORNO LO STATO DELLA LEZIONE SCELTA CON LA RISPOSTA ALLA CHIAMATA
      setCurrentLesson(response.data);
      //SI AGGIORNA LO STATO DELL'ALERT PER CONFERMARE ALL'UTENTE LA MODIFICA
      setSuccessAlert(true);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nell'aggiornamento della lezione: ", error);
      //SI AGGIORNA LO STATO DELL'ALERT PER RIFERIRE ALL'UTENTE DELL'ERRORE
      setErrorAlert(true);
    }
  };

  return (
    <form className="p-8 sm:p-16 lg:p-24" onSubmit={handleSubmit}>
      {successAlert && <ChangeSuccessAlert setSuccessAlert={setSuccessAlert} />}
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      <div className="flex items-center gap-2 mt-4">
        <Label html={"name"} content={"Titolo"} />
        <input
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white text-2xl font-bold lg:text-6xl md:text-4xl font-NCLMonsterBeast uppercase"
          id="name"
          placeholder={currentLesson.name}
          required
          name="name"
          value={lessonData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Label html={"description"} content={"Descrizione"} />
        <input
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white md:text-2xl"
          id="description"
          placeholder={currentLesson.description}
          required
          name="description"
          value={lessonData.description}
          onChange={handleChange}
        />
      </div>

      <p className="mt-4 text-white md:text-2xl">Giorno: {currentLesson.day}</p>

      <div className="flex items-center gap-2 mt-4">
        <Label html={"hour"} content={"Orario"} className="flex items-center" />
        <input
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white md:text-2xl"
          id="hour"
          placeholder={currentLesson.hour}
          required
          name="hour"
          value={lessonData.hour}
          onChange={handleChange}
        />
      </div>

      <button className="border rounded-md mt-4 bg-white p-1 font-bold lg:text-xl">
        Modifica Lezione
      </button>
    </form>
  );
}

export default ChangeClassDescriptionForm;
