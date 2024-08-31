import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavLogo({ handleLinkSidebar }) {
  return (
    //LOGO DELLA NAVBAR CON ANNESSA ANIMAZIONE, AL CLICK REINDERIZZA ALLA HOMEPAGE
    <Link to={"/"}>
      <motion.h1
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
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
    </Link>
  );
}

export default NavLogo;
