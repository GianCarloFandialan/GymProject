import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function NavUserIconOption({ text, Icon, setOpen, link }) {
  // VARIABILI DELLE ANIMAZIONI PER OGNI ELEMENTO DELLA LISTA DEL DROPDOWN
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };

  // VARIABILI DELLE ANIMAZIONI PER OGNI ICONA DELLA LISTA DEL DROPDOWN
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };

  return (
    <Link to={`/${link}`}>
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 w-full p-4 text-lg font-medium whitespace-nowrap rounded-md hover:bg-gray-100 text-white hover:text-gray-800 transition-colors cursor-pointer"
      >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
      </motion.li>
    </Link>
  );
};

export default NavUserIconOption