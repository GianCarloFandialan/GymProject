import { Link } from "react-router-dom";

function ChatTrainerButton() {
  return (
    <Link
      to={"/chat"}
      className="bg-white font-black px-5 py-3 rounded-xl text-xl"
    >
      CHAT
    </Link>
  );
}

export default ChatTrainerButton;
