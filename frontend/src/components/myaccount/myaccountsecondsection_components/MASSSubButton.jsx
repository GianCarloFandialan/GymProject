import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MASSSubButton() {
  return (
    <motion.div
      initial={{ scale: 0.1 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-10 mb-10"
    >
      <Link
        to={"/Abbonamenti"}
        className="text-xl font-black border-[1px] border-black rounded-full p-4 hover:text-white hover:bg-black"
      >
        Modifica Abbonamento
      </Link>
    </motion.div>
  );
}

export default MASSSubButton;
