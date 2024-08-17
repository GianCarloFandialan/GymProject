import { motion } from "framer-motion"
import NavUserIconOption from "./NavUserIconOption";
import { useContext, useState } from "react";
import { FiEdit,} from "react-icons/fi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { RiLoginCircleLine } from "react-icons/ri";
import { IsLoggedInContext } from "../../../../services/context";
import LogoutButton from "./logout_components/LogoutButton";



function NavUserIcon() {
  // SI CREA UNO STATO PER POTER GESTIRE IL DROPDOWN MENU AL CLICK SULL'ICONA DELL'UTENTE
  const [open, setOpen] = useState(false);

  // VARIANTI PER LE ANIMAZIONI DEL WRAPPER DEL DROPDOWN MENU NEL CASO SIA APERTO O CHIUSO 
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn} = useContext(IsLoggedInContext)
  
  return(
    <>
      <div className="flex items-center justify-center ">
        {/* NEL CASO SI PREMA SULL'ICONA SI ATTIVA O MENO UN'ANIMAZIONE */}
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <motion.svg 
            initial={{
              scale:0
            }}
            animate={{
              scale:1
            }}
            exit={
              {scale:0

              }}
            transition={{
              duration: 0.5,
              ease: "backInOut",
            }}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="lg:size-8 size-7 cursor-pointer rounded-full"
            onClick={() => setOpen((pv) => !pv)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </motion.svg>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-90%" }}
            className="flex flex-col gap-2 rounded-lg bg-gray-800 p-2 shadow-xl absolute top-[120%] left-[50%] overflow-hidden "
          >
            {isLoggedIn ?
              <>
                <NavUserIconOption setOpen={setOpen} Icon={FiEdit} text="Il mio account" link="account"/>
                <NavUserIconOption setOpen={setOpen} Icon={IoChatbubblesOutline} text="Chat" link="Chat"/>
                <LogoutButton setOpen={setOpen}/> 
              </>
              :
              <NavUserIconOption setOpen={setOpen} Icon={RiLoginCircleLine } text="Login" link="Login"/>
            }
            
          </motion.ul>
        </motion.div>
      </div>
      {/* ICONA USER CON ANNESSA ANIMAZIONE */}
    </>
  )
}

export default NavUserIcon