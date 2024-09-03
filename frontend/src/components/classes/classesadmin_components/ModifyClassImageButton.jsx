import { useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { updateClassCover } from "../../../services/api";

function ModifyClassImageButton({ id, currentLesson, setCurrentLesson }) {
  //CREA UN RIFERIMENTO ALL'ELEMENTO INPUT
  const fileInputRef = useRef(null);

  //FUNZIONE PER GESTIRE IL CLICK SUL PULSANTE
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  //FUNZIONE ASINCRONA PER GESTIRE LA SELEZIONE DEL FILE
  const handleFileChange = async (event) => {
    //CREO UNO COSTANTE PER IDENTIFICARE IL FILE CARICATO
    const file = event.target.files[0];
    //SE È STATO CARICATO UN FILE SI ESEGUE UNA CHIAMATA API
    if (file) {
      try {
        //SI CREA UNA COSTANTE FORM DATA E SI SALVANO I VARI DATI NECESSARI PER ESEGUIRE LA CHIAMATA CORRETTAMENTE
        const formData = new FormData();
        formData.append("cover", file);

        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE L'IMMAGINE DI COPERTINA DELLA LEZIONE
        const response = await updateClassCover(id, formData);

        //AGGIORNO LO STATO DELLA LEZIONE SCELTA CON LA RISPOSTA ALLA CHIAMATA
        setCurrentLesson(response.data);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error(
          "Errore nella modifica dell'immagine della classe: ",
          error
        );
      }
    }
  };

  return (
    <div>
      {/* INPUT DI TIPO FILE NASCOSTO */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* PULSANTE PERSONALIZZATO CHE AL CLICK RICHIAMA LA FUNZIONE PER CARICARE IL MESSAGGIO CON IL FILE */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-bold p-6 lg:text-4xl md:text-2xl text-lg rounded-xl flex"
      >
        <FiEdit className="lg:text-8xl text-6xl " /> Modifica immagine
      </button>
    </div>
  );
}
export default ModifyClassImageButton;
