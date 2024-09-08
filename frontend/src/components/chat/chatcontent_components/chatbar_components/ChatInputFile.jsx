import { useContext, useRef } from "react";
import { GoPaperclip } from "react-icons/go";
import { createMessageSpecial } from "../../../../services/api";
import { UserDataContext } from "../../../../services/context";

const ChatInputFile = ({ chatter, setChatMessages, chatmessages }) => {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

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
        formData.append("sender", userData._id);
        formData.append("reciever", chatter._id);
        formData.append("content", file);

        //SI EFFETUA UNA RICHIESTA POST AL BACKEND PER AGGIUNGERE UN MESSAGGIO, IN QUESTO UN MESSAGGIO CONTENTE UN FILE
        const response = await createMessageSpecial(formData);

        //SI AGGIORNA LO STATO DEI MESSAGGI DELLA CHAT CON LA RISPOSTA ALLA CHIAMATA
        setChatMessages([...chatmessages, response.data]);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nel caricamento del file del messaggio: ", error);
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
        className="bg-white font-bold py-2 px-4 rounded-3xl h-10"
      >
        <GoPaperclip className="text-2xl" />
      </button>
    </div>
  );
};

export default ChatInputFile;
