import { motion } from "framer-motion"

function NavUserIcon() {
  return(
    <>
      {/* ICONA USER CON ANNESSA ANIMAZIONE */}
      <motion.svg 
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
          duration: 0.5,
          ease: "backInOut",
        }}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="lg:size-8 size-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </motion.svg>
    </>
  )
}

export default NavUserIcon