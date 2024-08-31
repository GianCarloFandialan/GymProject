import ChatBarForm from "./chatbar_components/ChatBarForm";

function ChatBar({ chatter, chatmessages, setChatMessages }) {
  return (
    <div className="bg-white h-[80px] flex p-4 shadow-md">
      {/* FORM CON IL QUALE SI EFFETTUAN CIAMATE API */}
      {/* SI PASSANO COME PARAMETRI L'INTERLOCUTORE(chatter), LO STATO DEI MESSAGGI DELLA CHAT E LA SUA RELATIVA FUNZIONE */}
      <ChatBarForm
        chatter={chatter}
        chatmessages={chatmessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default ChatBar;
