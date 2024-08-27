import ChatBar from "./chatcontent_components/ChatBar";
import ChatMessages from "./chatcontent_components/ChatMessages";
import ChatTopBar from "./chatcontent_components/ChatTopBar";

function ChatContent({ chatter, setChatter }) {
  return (
    <div className="h-full w-full bg-indigo-500 md:max-w-[calc(100vw_-_40.5vw)] lg:max-w-[calc(100vw_-_27.5vw)] absolute right-0 top-0 flex flex-col">
      <ChatTopBar chatter={chatter} setChatter={setChatter} />
      <ChatMessages chatter={chatter} />
      <ChatBar />
    </div>
  );
}

export default ChatContent;
