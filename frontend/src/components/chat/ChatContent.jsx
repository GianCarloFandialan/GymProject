import { useState } from "react";
import ChatBar from "./chatcontent_components/ChatBar";
import ChatMessages from "./chatcontent_components/ChatMessages";
import ChatTopBar from "./chatcontent_components/ChatTopBar";

function ChatContent({ chatter, setChatter }) {
  //SI CREA UNO STATO IN CUI POTER GESTIRE SOLO I MESSAGGI DELLA CHAT PRECISA
  const [chatmessages, setChatMessages] = useState([]);

  return (
    <div className="h-full w-full md:max-w-[calc(100vw_-_40vw)] lg:max-w-[calc(100vw_-_27vw)] absolute right-0 top-0 flex flex-col -ml-4">
      <ChatTopBar chatter={chatter} setChatter={setChatter} />
      <ChatMessages
        chatter={chatter}
        chatmessages={chatmessages}
        setChatMessages={setChatMessages}
      />
      <ChatBar
        chatter={chatter}
        setChatMessages={setChatMessages}
        chatmessages={chatmessages}
      />
    </div>
  );
}

export default ChatContent;
