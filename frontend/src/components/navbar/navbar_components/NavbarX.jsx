import { motion } from "framer-motion";

function NavbarX({ setOpenSidebar, openSidebar }) {
  return (
    //ICONA PER CHIUDERE LA SIDEBAR CON ANNESSA ANIMAZIONE, AL CLICK CHIUDE LA SIDEBAR
    <motion.svg
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.5,
        ease: "backInOut",
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-7 cursor-pointer"
      onClick={() => setOpenSidebar(false)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </motion.svg>
  );
}

export default NavbarX;
