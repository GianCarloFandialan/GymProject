import { useState } from "react";
import ChatBar from "./chatcontent_components/ChatBar";
import ChatMessages from "./chatcontent_components/ChatMessages";
import ChatTopBar from "./chatcontent_components/ChatTopBar";

function ChatContent({ chatter, setChatter }) {
  //SI CREA UNO STATO IN CUI POTER GESTIRE SOLO I MESSAGGI DELLA CHAT CON L'INTERLOCUTORE SCELTO(chatter)
  const [chatmessages, setChatMessages] = useState([]);

  return (
    //SI DIVIDE QUESTO COMPONENTE IN TRE BLOCCHI: BARRA SUPERIORE, CONTENUTO DELLA CHAT, BARRA ININFERIORE
    <div className="h-full w-full md:max-w-[calc(100vw_-_40vw)] lg:max-w-[calc(100vw_-_27vw)] absolute right-0 top-0 flex flex-col -ml-4">
      {/* BARRA IN CUI È SPECIFICATO L'INTERLOCUTORE E CON CUI È POSSIBILE CHIUDERE LA CHAT */}
      {/* SI PASSANO COME PARAMETRI L'INTERLOCUTORE(chatter) E LA FUNZIONE PER MODIFICARLO(setChatter) */}
      <ChatTopBar chatter={chatter} setChatter={setChatter} />
      {/* CONTENUTO DELLA CHAT CON GLI EFFETTIVI MESSAGGI */}
      {/* SI PASSANO COME PARAMETRI L'INTERLOCUTORE(chatter), LA FUNZIONE PER MODIFICARLO(setChatter) E LA FUNZIONE PER MODIFICARE LO STATO DEI MESSAGGGI DELLA CHAT */}
      <ChatMessages
        chatter={chatter}
        chatmessages={chatmessages}
        setChatMessages={setChatMessages}
      />
      {/* BARRA INFERIORE CON CUI È POSSIBILE MANDARE MESSAGGI E ALLEGATI */}
      {/* SI PASSANO COME PARAMETRI L'INTERLOCUTORE(chatter), LO STATO DEI MESSAGGI DELLA CHAT E LA SUA RELATIVA FUNZIONE */}
      <ChatBar
        chatter={chatter}
        setChatMessages={setChatMessages}
        chatmessages={chatmessages}
      />
    </div>
  );
}

export default ChatContent;
