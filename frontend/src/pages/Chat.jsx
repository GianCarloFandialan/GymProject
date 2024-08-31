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

  //AL CARICAMENTO DEL COMPONENTE SE L'UTENTE NON HA EFFETTUATO L'ACCESSO VIENE AUTOMATICAMENTE REINDIRIZZATO ALLA HOMEPAGE
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* CONTENITORE PRINCIPALE DEL COMPOENENTE*/}
      <div className="h-[calc(100vh_-_80px)] flex w-full absolute bottom-0 left-0 right-0 top-[80px]">
        {/* SIDEBAR A CUI VIENE PASSATA COME PARAMETRO IL "setChatter" */}
        <ChatSidebar setChatter={setChatter} />

        {/* AL CARICAMENTO DEL COMPONENTE SE NON È STATO SELEZIONATO ALCUN UTENTE CON CUI CHATTARE COMPARE LA PAGINA DI BENVENUTO ALLA CHAT */}
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
