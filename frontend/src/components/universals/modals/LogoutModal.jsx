import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IsLoggedInContext } from "../../../services/context";

function LogoutModal( { setLogoutSuccess } ) {

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext)

  //CREO UNA FUNZIONE PER GESTIRMI IL LOGOUT
  const handleLogoutClick = () => {
    // setOpen(false)
    navigate("/")
    setLogoutSuccess(false)
    setIsLoggedIn(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleLogoutClick}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-green-900 to-green-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-700 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">
              Successo!
            </h3>
            <p className="text-center mb-6">
              Logout avvenuto con successo!
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleLogoutClick}
                className="bg-white hover:opacity-90 transition-opacity text-green-700 font-semibold w-full py-2 rounded"
              >
                Chiudi
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LogoutModal