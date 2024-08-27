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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMessage(newNormalMessagge);
      setChatMessages([...chatmessages, response.data]);
    } catch (error) {
      console.error("Errore nel caricamento del messaggio: ", error);
    }
  };

  return (
    <form className="flex items-center flex-grow gap-4" onSubmit={handleSubmit}>
      <ChatText
        newNormalMessagge={newNormalMessagge}
        setNewNormalMessage={setNewNormalMessage}
      />
      <ChatInputFile
        chatter={chatter}
        setChatMessages={setChatMessages}
        chatmessages={chatmessages}
      />
      <ChatSubmit />
    </form>
  );
}

export default ChatBarForm;
