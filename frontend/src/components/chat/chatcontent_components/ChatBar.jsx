import ChatBarForm from "./chatbar_components/ChatBarForm";

function ChatBar({ chatter, chatmessages, setChatMessages }) {
  return (
    <div className="bg-white h-[80px] flex p-4 shadow-md">
      <ChatBarForm
        chatter={chatter}
        chatmessages={chatmessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default ChatBar;
