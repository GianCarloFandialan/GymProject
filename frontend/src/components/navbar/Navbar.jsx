import { useContext, useEffect, useState } from "react";
import NavbarHamburger from "./navbar_components/NavbarHamburger";
import NavList from "./navbar_components/NavList";
import NavLogo from "./navbar_components/NavLogo";
import NavSubscription from "./navbar_components/NavSubscription";
import Sidebar from "./sidebar/Sidebar";
import NavbarX from "./navbar_components/NavbarX";
import { AnimatePresence, motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavUserIcon from "./navbar_components/usericon_components/NavUserIcon";
import { IsLoggedInContext, UserDataContext } from "../../services/context";
import { getUserData } from "../../services/api";

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

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext)

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext)

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate()

  //FUNZIONE PER GESTIRE IL LOGIN
  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const response = await getUserData();
        setUserData(response);        
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Token non valido:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  // HOOK PER ACCEDERE AI PARAMETRI DELL'URL CORRENTE
  const location = useLocation();

   //USE EFFECT CHE SI ATTIVA ALL'ACCESSO O LOGOUT DELL'UTENTE 
   useEffect(() => {

    checkLoginStatus();

    //EVENT LISTENER PER CONTROLLARE LO STATO DI LOGIN
    window.addEventListener("storage", checkLoginStatus);
    // EVENTO PER IL CAMBIO DI STATO
    window.addEventListener("loginStateChange", checkLoginStatus);

    //RIMUOVO L'EVENT LISTENER QUANDO IL COMPONENTE VIENE SMONTATO
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("loginStateChange", checkLoginStatus);
    };

  }, [isLoggedIn]);

  useEffect(() => {
    if (!userData.hasOwnProperty('Subscription')) {
      // navigate('/abbonamenti')
    }
  },[])

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
          className="hidden lg:block"
        >
          <NavList 
            listItems={listItems} 
            linkItemVariants={linkItemVariants}               
            navLinksVariants={navLinksVariants} 
          />
        </motion.div>
  
        {/* BOTTONO PER ABBONARSI OPPURE PER L'INTERFACCIA DELLA PAGINA UTENTE VISIBILI SOLO A SCHERMO LARGO GRAZIE ALLE CLASSI TAILWIND */}
        <div className="hidden lg:flex items-center gap-3">
          <NavUserIcon/>
          {!isLoggedIn && <NavSubscription/>}     
        </div>

        {/* SE LA SIDEBAR NON È APERTA, A SCHERMO MEDIO è PRESENTE IL BOTTONE PER ABBONARSI */}
        {!openSidebar && 
          <div className="hidden sm:block lg:hidden -ms-16">
            {!isLoggedIn && <NavSubscription/>}     
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
            {!isLoggedIn && <NavSubscription/>}           
            </div>
          </Sidebar>
        }
      </AnimatePresence>    
    </motion.nav>
  )
}

export default Navbar;