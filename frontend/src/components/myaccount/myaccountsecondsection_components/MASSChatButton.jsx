import { Link } from "react-router-dom";

function MASSChatButton() {
  return (
    <div className="w-full lg:w-4/12 px-4 lg:text-right lg:self-center">
      <div className="py-6 px-3 mt-32 sm:mt-0">
        <Link to={"/chat"}>
          <button
            className="bg-black active:bg-gray-800 hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-lg px-8 py-4 rounded-2xl outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Chat
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MASSChatButton;
