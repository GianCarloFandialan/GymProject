import { motion } from "framer-motion";
import FPSComponent from "./FullPageSpinner_components/FPSComponent";

function FullPageSpinner() {
  return (
    <>
    {/* SPINNER GRANDEZZA PAGINA IN ATTESA DEL RENDERIZZAMENTO DELLA CHIAMATA API */}
      <motion.div
        className="absolute bottom-[-840px] right-[-200px]"
        initial={{ rotate: 45 }}
        animate={{ rotate: -315 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <FPSComponent
          text="LOADING LOADING LOADING LOADING LOADING LOADING"
          radius={800}
          fontSize="180px"
          letterSpacing={8}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-[-695px] right-[-50px]"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <FPSComponent
          text="LOADING  LOADING  LOADING  LOADING"
          radius={650}
          fontSize="180px"
          letterSpacing={10}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-[-510px] right-[110px]"
        initial={{ rotate: -5 }}
        animate={{ rotate: -365 }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <FPSComponent
          text="LOADING LOADING LOADING"
          radius={480}
          fontSize="180px"
          letterSpacing={15}
        />
      </motion.div>
    </>
  )
}

export default FullPageSpinner