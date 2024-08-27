import { useContext, useRef } from "react";
import { GoPaperclip } from "react-icons/go";
import { createMessageSpecial } from "../../../../services/api";
import { UserDataContext } from "../../../../services/context";

const ChatInputFile = ({ chatter, setChatMessages, chatmessages }) => {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  // CREA UN RIFERIMENTO ALL'ELEMENTO INPUT
  const fileInputRef = useRef(null);

  // FUNZIONE PER GESTIRE IL CLICK SUL PULSANTE
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // FUNZIONE PER GESTIRE LA SELEZIONE DEL FILE
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // QUI PUOI GESTIRE IL FILE SELEZIONATO
      console.log("File selezionato:", file.name);
      try {
        const formData = new FormData();
        formData.append("sender", userData._id);
        formData.append("reciever", chatter._id);
        formData.append("content", file);

        const response = await createMessageSpecial(formData);
        console.log(response.data);

        setChatMessages([...chatmessages, response.data]);
      } catch (error) {
        console.error("Errore nel caricamento del messaggio: ", error);
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

      {/* PULSANTE PERSONALIZZATO */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-white font-bold py-2 px-4 rounded-3xl h-10"
      >
        <GoPaperclip className="text-2xl" />
      </button>
    </div>
  );
};

export default ChatInputFile;
