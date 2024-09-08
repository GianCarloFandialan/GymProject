import { useContext, useState } from "react";
import ChatInputFile from "./ChatInputFile";
import ChatSubmit from "./ChatSubmit";
import ChatText from "./ChatText";
import { UserDataContext } from "../../../../services/context";
import { createMessage } from "../../../../services/api";

function ChatBarForm({ chatter, setChatMessages, chatmessages }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI CREA UNO STATO PER POTER GESTIRE IL NUOVO MESSAGGIO INVIATO
  const [newNormalMessagge, setNewNormalMessage] = useState({
    sender: userData._id,
    content: "",
    reciever: chatter._id,
  });

  //FUNZIONE PER GESTIRE IL SUBMIT DEL FORM E QUINDI L'INVIO DI UN MESSAGGIO NORMALE
  const handleSubmit = async (e) => {
    e.preventDefault();

    //SI EFFETUA UNA RICHIESTA POST AL BACKEND PER AGGIUNGERE UN MESSAGGIO
    try {
      const response = await createMessage(newNormalMessagge);
      //SI AGGIORNA LO STATO DEI MESSAGGI DELLA CHAT CON LA RISPOSTA ALLA CHIAMATA
      setChatMessages([...chatmessages, response.data]);
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nell'aggiunta di un nuovo messaggio: ", error);
    }
  };

  return (
    //IL FORM VIENE SUDDIVISO IN 3 COMPONENTI
    <form className="flex items-center flex-grow gap-4" onSubmit={handleSubmit}>
      {/* CASELLA DI INPUT DI TESTO IN CUI INSERIRE IL CONENUTO DEL MESSAGGIO */}
      {/* SI PASSANO COME PARAMETRI LO STATO DEL NUOVO MESSAGGGIO E LA FUNZIONE PER MODIFICARLO */}
      <ChatText
        newNormalMessagge={newNormalMessagge}
        setNewNormalMessage={setNewNormalMessage}
      />
      {/* CASELLA DI INPUT PER AGIUNGERE EVENTUALI FILE ALLEGATI */}
      {/* SI PASSANO COME PARAMETRI L'INTERLOCUTORE(chatter), LO SATO DEI MESSAGGI DELLA CHAT E LA SUA RISPETTIVA FUNZIONE */}
      <ChatInputFile
        chatter={chatter}
        setChatMessages={setChatMessages}
        chatmessages={chatmessages}
      />
      {/* BOTTONE DI SUBMIT DEL FORM */}
      <ChatSubmit />
    </form>
  );
}

export default ChatBarForm;
