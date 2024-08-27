import { motion } from "framer-motion";

function NavbarHamburger({ setOpenSidebar, openSidebar }) {
  return (
    // ICONA DELL'HAMBURGER MENU CON ANNESSA ANIMAZIONE
    <motion.svg
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
      className="size-7 lg:hidden cursor-pointer"
      onClick={() => setOpenSidebar(!openSidebar)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </motion.svg>
  );
}

export default NavbarHamburger;
