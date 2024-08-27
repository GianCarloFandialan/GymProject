import { motion } from "framer-motion";

function MASSMethodButton({ setOpenModal }) {
  return (
    <motion.div
      initial={{ scale: 0.1 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.8 }}
      className="mt-10 mb-10"
    >
      <button
        className="text-xl font-black border-[1px] border-black rounded-full p-4 hover:text-white hover:bg-black"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Modifica Metodo di Pagamento
      </button>
    </motion.div>
  );
}

export default MASSMethodButton;
