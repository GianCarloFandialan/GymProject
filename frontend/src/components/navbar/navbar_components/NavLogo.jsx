import { motion } from "framer-motion";

function NavLogo({ handleLinkSidebar }) {
  return (
    //LOGO DELLA NAVBAR CON ANNESSA ANIMAZIONE
    <motion.h1
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.8,
        ease: "backInOut",
      }}
      className="font-bold text-3xl cursor-pointer font-ZENOVAXENO"
      onClick={() => handleLinkSidebar(false)}
    >
      GYMPROJECT
    </motion.h1>
  );
}

export default NavLogo;
