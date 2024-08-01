import { useState } from "react";
import NavbarHamburger from "./navbar_components/NavbarHamburger";
import NavList from "./navbar_components/NavList";
import NavLogo from "./navbar_components/NavLogo";
import NavSubscription from "./navbar_components/NavSubscription";
import NavUserIcon from "./navbar_components/NavUserIcon";
import Sidebar from "./sidebar/Sidebar";
import NavbarX from "./navbar_components/NavbarX";
import { AnimatePresence, motion } from "framer-motion"

function Navbar() {

  const listItems = ['PALESTRE', 'CLASSI', 'ABBONAMENTI', 'TRAINERS', 'SHOP']

  const [openSidebar, setOpenSidebar] = useState(false)

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar)
  }

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
    className="shadow-md px-7 z-20 fixed w-screen bg-white">
      <div className=" h-[80px] flex justify-between items-center lg:w-[85vw] mx-auto">

        <NavLogo/>

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
  
        <div className="hidden lg:flex items-center gap-3">
          <NavUserIcon/>
          <NavSubscription/>
        </div>

        {!openSidebar && 
          <div className="hidden sm:block lg:hidden -ms-16">
            <NavSubscription/>
          </div>
        }
        
        <div className="block lg:hidden" onClick={handleSidebar}>
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

      <AnimatePresence>
        {openSidebar && 
          <Sidebar> 
            <NavList listItems={listItems} linkItemVariants={linkItemVariants} navLinksVariants={navLinksVariants}/>
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