import ChatInputFile from "./ChatInputFile";
import ChatSubmit from "./ChatSubmit";
import ChatText from "./ChatText";

function ChatBarForm() {
  return (
    <form className="flex items-center flex-grow gap-4">
      <ChatText />
      <ChatInputFile />
      <ChatSubmit />
    </form>
  );
}

export default ChatBarForm;
