import { useContext } from "react";
import { UserDataContext } from "../../../../services/context";
import ChatUserMessage from "./ChatUserMessage";
import ChatChatterMessage from "./ChatChatterMessage";

function ChatMessagesList({ chatmessages }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <ul>
      {/* I MESSAGGI VENGONO SUDDIVISI IN DUE COMPONENTI DIPENDEMENTE DALL'AUTORE */}
      {chatmessages.map((chatmessage) => {
        //SE L'UTENTE HA MANDATO IL MESSAGGIO ESSO VIENE POSTO COME CONTENUTO DEL COMPONENTE "ChatUserMessage"
        if (chatmessage.sender == userData._id) {
          return (
            <ChatUserMessage key={chatmessage._id} chatmessage={chatmessage} />
          );
        } else {
          //SE L'INTERLOCUTORE HA MANDATO IL MESSAGGIO ESSO VIENE POSTO COME CONTENUTO DEL COMPONENTE "ChatChatterMessage""
          return (
            <ChatChatterMessage
              key={chatmessage._id}
              chatmessage={chatmessage}
            />
          );
        }
      })}
    </ul>
  );
}

export default ChatMessagesList;
