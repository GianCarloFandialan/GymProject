import { useContext } from "react";
import { LogoutSuccessContext } from "../../../services/context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MASSLogoutButton() {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE IL MODALE NEL CASO DI LOGOUT AVVENUTO CON SUCCESSO
  const { logoutSuccess, setLogoutSuccess } = useContext(LogoutSuccessContext);

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

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
      {" "}
      {/* AL CLICK MODIFICA LO STATO DEL CONTEXT ED ESEGUE QUINDI IL LOGOUT REINDIRIZZANDO ALLA HOMEPAGE */}
      <button
        className="bg-black active:bg-gray-800 hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-lg px-8 py-4 rounded-2xl outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          setLogoutSuccess(true);
          navigate("/");
        }}
      >
        Logout
      </button>
    </motion.div>
  );
}

export default MASSLogoutButton;
