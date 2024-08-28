import { useContext, useEffect, useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import { getUsers } from "../services/api";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import ChatContent from "../components/chat/ChatContent";
import ChatSidebarWelcome from "../components/chat/ChatSidebarWelcome";
import { UserDataContext } from "../services/context";

function Chat() {
  //SI CREA UNO STATO PER POTER GESTIRE CON QUALE UTENTE SI STA CHATTANDO E DI CONSEGUENZA QUALE CHAT APRIRE
  const [chatter, setChatter] = useState(null);

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
