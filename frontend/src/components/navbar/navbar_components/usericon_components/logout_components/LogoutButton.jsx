import { motion } from "framer-motion"
import { RiLogoutCircleLine } from "react-icons/ri";
import { useContext } from "react";
import { LogoutSuccessContext } from "../../../../../services/context";
import { useNavigate } from "react-router-dom";

function LogoutButton( { setOpen } ) {

  // VARIABILI DELLE ANIMAZIONI PER OGNI ELEMENTO DELLA LISTA DEL DROPDOWN
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };

  // VARIABILI DELLE ANIMAZIONI PER OGNI ICONA DELLA LISTA DEL DROPDOWN
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };

  //SI USA IL CONTEXT CHE AIUTA A GESITRE IL MODALE NEL CASO DI LOGOUT AVVENUTO CON SUCCESSO
  const { logoutSuccess, setLogoutSuccess } = useContext(LogoutSuccessContext)

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate()

  return (
    <>
      <motion.li
        variants={itemVariants}
        onClick={() => {
          setLogoutSuccess(true)
          setOpen(false)
          navigate('/')
        }}
        className="flex items-center gap-2 w-full p-4 text-lg font-medium whitespace-nowrap rounded-md hover:bg-gray-100 text-white hover:text-gray-800 transition-colors cursor-pointer"
      >
        <motion.span variants={actionIconVariants}>
          <RiLogoutCircleLine />
        </motion.span>
        <span>Logout</span>
      </motion.li>
    </>
  )
}

export default LogoutButton