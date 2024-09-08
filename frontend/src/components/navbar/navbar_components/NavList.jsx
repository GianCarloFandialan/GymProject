import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavList({
  listItems,
  linkItemVariants,
  navLinksVariants,
  handleLinkSidebar,
}) {
  return (
    <>
      {/* LISTA DELLA NAVBAR CON ANNESSA ANIMAZIONE CHE SI RENDERIZZA IN VERTICALE OD ORIZZONTALE IN BASE ALLA GRANDEZA DELLA VIEWPORT */}
      <motion.ul
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
        variants={navLinksVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex lg:flex-row lg:gap-4 lg:font-semibold lg:text-lg font-extrabold text-2xl flex-col gap-5"
      >
        {listItems.map((listItem) => {
          return (
            //OGNI ELEMENTO DELLA LISTA REINDERIZZA ALLA CORRISPETTIVA PAGINA
            <Link
              to={`/${listItem.slice(0, 1)}${listItem.slice(1).toLowerCase()}`}
              key={listItem}
              onClick={() => handleLinkSidebar(false)}
            >
              <motion.li
                variants={linkItemVariants}
                className="border-b border-gray-400 border-t-0 pb-3 lg:border-0 lg:pb-0"
                onClick={() => handleLinkSidebar}
              >
                {listItem}
              </motion.li>
            </Link>
          );
        })}
      </motion.ul>
    </>
  );
}

export default NavList;
