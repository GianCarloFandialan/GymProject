import { motion } from "framer-motion"

function NavSubscription() {
  return(
    <>
      {/* BOTTONE PER ABBONARSI CON ANNESSA ANIMAZIONE */}
      <motion.button 
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
        type="button" 
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg lg:text-lg text-xl px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 lg:w-28 w-48 lg:ms-0">
        ISCRIVITI
      </motion.button>
    </>
  )
}

export default NavSubscription