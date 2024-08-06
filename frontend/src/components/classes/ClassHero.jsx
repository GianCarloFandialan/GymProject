import { motion } from "framer-motion";

function ClassHero() {
  return (
    <>
      <motion.section 
        initial={{ opacity:0, y:'-30vh' }} 
        whileInView={{ opacity:1, y:'0' }}
        transition={{duration: 1.3}} 
        className="flex flex-col items-center pt-5 pb-2"
      >
        <h2 className="lg:text-6xl md:text-5xl text-3xl font-NCLMonsterBeast text-center max-w-[75vw]">
          GYMPROJECT: <span className="lg:text-6xl md:text-4xl text-2xl">Allenati. Cresci. Brilla.</span>
        </h2>
        <span className="lg:text-xl md:text-lg text-sm lg:max-w-6xl font-bold text-center lg:pt-8 md:pt-6 pt-3  max-w-[75vw]">
          "Scopri una nuova dimensione di fitness con i nostri corsi esclusivi. Scegli tra potenziamento muscolare, allenamenti cardio e rilassamento mentale. Iscriviti oggi e inizia il tuo viaggio verso una versione migliore di te stesso!"
        </span>
      </motion.section>
    </>
  )
}

export default ClassHero