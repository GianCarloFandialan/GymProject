import { useContext } from "react";
import { UserDataContext } from "../../../../services/context";

function ChatMessagesList({ chatmessages }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <ul>
      {chatmessages.map((chatmessage) => {
        if (chatmessage.sender == userData._id) {
          return (
            <li key={chatmessage._id} className="text-right">
              {chatmessage.content}
            </li>
          );
        } else {
          return <li key={chatmessage._id}>{chatmessage.content}</li>;
        }
      })}
    </ul>
  );
}

export default ChatMessagesList;
