import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MASSChatButton() {
  return (
    <motion.div
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{ scale: 0 }}
      transition={{
        duration: 2.5,
        ease: "backInOut",
      }}
      className="lg:w-4/12 px-4 lg:self-center flex items-center"
    >
      <div className="px-3 sm:mt-0 ">
        {/* AL CLICK REINDERIZZA ALLA PAGINA DELLE CHAT */}
        <Link to={"/chat"}>
          <button
            className="bg-black active:bg-gray-800 hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-lg px-8 py-4 rounded-2xl outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Chat
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default MASSChatButton;
