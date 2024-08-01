import { motion } from "framer-motion"

function NavList( { listItems, linkItemVariants, navLinksVariants } ) {
  return (
    <>
      <motion.ul 
        variants={navLinksVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex lg:flex-row lg:gap-4 lg:font-semibold lg:text-lg font-extrabold text-2xl flex-col gap-5">
        {listItems.map(listItem => {
          return (
            <motion.li 
              key={listItem} 
              variants={linkItemVariants}
              className="border-b border-gray-400 border-t-0 pb-3 lg:border-0 lg:pb-0">
              {listItem}
            </motion.li>
          )
        })}
      </motion.ul>
    </>
  )
}

export default NavList