import { FaUserCircle } from "react-icons/fa";
import MASSLogoutButton from "./MASSLogoutButton";
import MASSChatButton from "./MASSChatButton";

function MASSFirstLine() {
  return (
    <div className="flex flex-wrap justify-center">
      <MASSLogoutButton />
      <div className="w-full lg:w-3/12 px-4 flex justify-center">
        <div className="relative">
          <FaUserCircle className="text-9xl mt-5" />
        </div>
      </div>
      <MASSChatButton />
    </div>
  );
}

export default MASSFirstLine;
