import { motion } from "framer-motion";

function Sidebar({ children }) {
  //SIDEBAR CON ANNESSA ANIMAZIONE
  return (
    <motion.div
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
      className="h-[calc(100vh_-_80px)] z-10"
    >
      {children}
    </motion.div>
  );
}

export default Sidebar;
