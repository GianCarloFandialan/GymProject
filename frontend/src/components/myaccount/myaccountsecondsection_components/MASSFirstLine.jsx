import { FaUserCircle } from "react-icons/fa";
import MASSLogoutButton from "./MASSLogoutButton";
import MASSChatButton from "./MASSChatButton";

function MASSFirstLine() {
  return (
    <div className="flex flex-wrap justify-center flex-col lg:flex-row">
      <div className="hidden lg:flex justify-center">
        <MASSLogoutButton />
      </div>

      <div className="flex-grow lg:w-3/12 px-4 flex justify-center">
        <div className="relative">
          <FaUserCircle className="text-9xl mt-5" />
        </div>
      </div>

      <div className="hidden lg:flex ">
        <MASSChatButton />
      </div>

      <div className="flex justify-center lg:hidden mt-10">
        <MASSLogoutButton />
        <MASSChatButton />
      </div>
    </div>
  );
}

export default MASSFirstLine;
