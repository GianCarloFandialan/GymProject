import { useState } from "react";
import NavbarHamburger from "./navbar_components/NavbarHamburger";
import NavList from "./navbar_components/NavList";
import NavLogo from "./navbar_components/NavLogo";
import NavSubscription from "./navbar_components/NavSubscription";

import Sidebar from "./sidebar/Sidebar";
import NavbarX from "./navbar_components/NavbarX";
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom";
import NavUserIcon from "./navbar_components/usericon_components/NavUserIcon";

function Navbar() {

  //SI IMPOSTA UNA COSTANTE CON GLI ELEMENTI DELLA LISTA CONTENUTI NELLA NAVBAR
  const listItems = ['PALESTRE', 'CLASSI', 'ABBONAMENTI', 'TRAINERS', 'CONTATTI']

  //STATO CHE AIUTA A CONTROLLARE L'APERTURA O LA CHIUSURA DELLA NAVBAR
  const [openSidebar, setOpenSidebar] = useState(false)

  //FUNZIONE PER POTER CHIUDERE LA SIDEBAR OGNI VOLTA CHE SI PREME SU UN LINK NELLA TENDINA
  const handleLinkSidebar = (prova) => {
    setOpenSidebar(prova)
  };

  //SI IMPOSTANO LE VARIBILI PER L'ANIMAZIONE DELLA LISTA DELLA NAVBAR
  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  //SI IMPOSTANO LE VARIABILI PER LE ANIMAZIONI DEGLI ELEMENTI DELLA LISTA
  const linkItemVariants = {
    hidden: { opacity: 0, y: '50%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" // Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      y: '50%',
      transition: {
        duration: 0.1,
        ease: "easeOut" // Add ease-out easing function
      }
    },
  };

  return(
    <motion.nav 
      initial={{ y:-79 }} 
      whileInView={{ y:0 }}
      transition={{duration: 1,}}
      className="shadow-md px-7 z-50 fixed w-screen bg-white"
    >
      <div className=" h-[80px] flex justify-between items-center lg:w-[85vw] mx-auto">

        {/* IL CLICK SUL LOGO MI RIMPORTA ALLA HOMEPAGE */}
        <Link to="/">
          <NavLogo handleLinkSidebar={handleLinkSidebar}/>
        </Link>

        {/* LISTA DEI LINK DI REINDIRIZZAMENTO VISIBILE SOLO SE LO SCHERMO È LARGO TRAMITE LE CLASSI DI TAILWIND */}
        <motion.div
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
            duration: 0.8,
            ease: "backInOut",
          }} 
          className="hidden lg:block">
          <NavList listItems={listItems}/>
        </motion.div>
  
        {/* BOTTONO PER ABBONARSI OPPURE PER L'INTERFACCIA DELLA PAGINA UTENTE VISIBILI SOLO A SCHERMO LARGO GRAZIE ALLE CLASSI TAILWIND */}
        <div className="hidden lg:flex items-center gap-3">
          <NavUserIcon/>
          <NavSubscription/>
        </div>

        {/* SE LA SIDEBAR NON È APERTA, A SCHERMO MEDIO è PRESENTE IL BOTTONE PER ABBONARSI */}
        {!openSidebar && 
          <div className="hidden sm:block lg:hidden -ms-16">
            <NavSubscription/>
          </div>
        }
        
        {/* SE LA SIDEBAR È APERTA FUORIESCE L'HAMBURGER PER APRIRLA AL CLICK, ALTRIMENTI, SE APERTA ESCONO L'ICONA DELL'UTENTE E L'ICONA "X" PER CHIUDERE LA SIDEBAR */}
        <div className="block lg:hidden" onClick={() => setOpenSidebar(!openSidebar)}>
          {openSidebar ? 
            <div className="flex gap-3">
              <NavUserIcon/>
              <NavbarX/> 
            </div>
            : 
            <NavbarHamburger/>
          }
        </div>
      </div>

      {/* SIDEBAR CHE SI RENDERIZZA SOLO QUANDO SI PREME L'ICONA PER APRIRLA */}
      <AnimatePresence>
        {openSidebar && 
          <Sidebar> 
            <NavList 
              listItems={listItems} 
              linkItemVariants={linkItemVariants} 
              navLinksVariants={navLinksVariants} 
              handleLinkSidebar={handleLinkSidebar}
            />
            <div className="flex justify-center mt-10">
            <NavSubscription/>
            </div>
          </Sidebar>
        }
      </AnimatePresence>    
    </motion.nav>
  )
}

export default Navbar;