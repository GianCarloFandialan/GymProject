import { useContext, useEffect, useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatContent from "../components/chat/ChatContent";
import ChatSidebarWelcome from "../components/chat/ChatSidebarWelcome";
import { IsLoggedInContext } from "../services/context";
import { useNavigate } from "react-router-dom";

function Chat() {
  //SI CREA UNO STATO PER POTER GESTIRE CON QUALE UTENTE SI STA CHATTANDO E DI CONSEGUENZA QUALE CHAT APRIRE
  const [chatter, setChatter] = useState(null);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-[calc(100vh_-_80px)] flex w-full absolute bottom-0 left-0 right-0 top-[80px]">
        <ChatSidebar setChatter={setChatter} />
        {chatter ? (
          <ChatContent chatter={chatter} setChatter={setChatter} />
        ) : (
          <ChatSidebarWelcome />
        )}
      </div>
    </>
  );
}

export default Chat;
