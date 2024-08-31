import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../services/context";
import { getMessages } from "../../../services/api";
import FullPageSpinner from "../../spinners/FullPageSpinner";
import ChatMessagesList from "./chatmessages_components/ChatMessagesList";

function ChatMessages({ chatter, chatmessages, setChatMessages }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //USEEFFECT CHE SI ATTIVA OGNI VOLTA CHE L'INTERLOCUTORE CAMBIA(chatter)
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE I MESSAGGI E FILTRARE QUELLI PRECISI DELLA CHAT
    const fetchMessages = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I MESSAGGI
        const response = await getMessages();
        //AGGIORNA LO STATO CON TUTTI I MESSAGGI DELLA CHAT
        setChatMessages(
          response.data.filter(
            (message) =>
              (message.sender == chatter._id &&
                message.reciever == userData._id) ||
              (message.sender == userData._id &&
                message.reciever == chatter._id)
          )
        );
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei messaggi della chat: ", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchMessages
    fetchMessages();
  }, [chatter]);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden bg-white">
          <FullPageSpinner />
        </div>
      ) : (
        <div className="flex-grow bg-white border-y-[1px] border-gray-300 p-7 h-[calc(100vh_-_250px)] overflow-y-scroll">
          {/* COMPONENTE CONTENTE I MESSAGGI */}
          <ChatMessagesList chatmessages={chatmessages} />
        </div>
      )}
    </>
  );
}

export default ChatMessages;
