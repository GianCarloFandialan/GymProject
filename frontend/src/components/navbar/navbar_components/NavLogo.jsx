import { motion } from "framer-motion"

function NavLogo() {
  return (
    <motion.h1 
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
      className="font-bold text-3xl cursor-pointer font-ZENOVAXENO ">
      GYMPROJECT
    </motion.h1>
  )
}

export default NavLogo