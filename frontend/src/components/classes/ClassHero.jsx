import { motion } from "framer-motion";

function ClassHero() {
  return (
    <>
      <motion.section 
        initial={{ opacity:0, y:'-35vh' }} 
        whileInView={{ opacity:1, y:'0' }}
        transition={{duration: 1.3}} 
        className="flex flex-col items-center py-12"
      >
        <h2 className="text-6xl font-NCLMonsterBeast">
          GYMPROJECT: <span className="text-5xl">Allenati. Cresci. Brilla.</span>
        </h2>
        <span className="text-lg lg:max-w-6xl font-bold text-center pt-10">
          "Scopri una nuova dimensione di fitness con i nostri corsi esclusivi. Scegli tra potenziamento muscolare, allenamenti cardio e rilassamento mentale. Iscriviti oggi e inizia il tuo viaggio verso una versione migliore di te stesso!"
        </span>
      </motion.section>
    </>
  )
}

export default ClassHero