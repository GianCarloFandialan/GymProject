import { useState } from "react";
import { motion } from "framer-motion";

function HomeHero({ contents, setContents }) {
  //CREO UNO STATO PER GESTIRE SOLO I DATI DELL'HERO CHE MI SERVONO
  const [heroContent, setHeroContent] = useState(
    contents.filter((hero) => hero.title == "Jumbotron")
  );

  return (
    <motion.div
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      initial={{ opacity: 0, y: "-35vh" }}
      whileInView={{ opacity: 1, y: "0" }}
      transition={{ duration: 1.3 }}
      className="relative"
    >
      <img
        src={`${heroContent[0].cover}`}
        alt="jumbotron image"
        className="lg:h-[calc(100vh_-_80px)] w-screen object-cover object-center"
      />
      <span className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center font-NCLMonsterBeast md:text-4xl lg:text-6xl">
        {heroContent[0].description}
      </span>
    </motion.div>
  );
}

export default HomeHero;
