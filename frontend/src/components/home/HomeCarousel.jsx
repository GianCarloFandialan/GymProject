import { motion, useTransform, useScroll } from "framer-motion";
import { useContext, useRef, useState } from "react";
import HomeCarouselCard from "./homecarousel_components/HomeCarouselCard";
import { HomePageContext } from "../../services/context";
import { Link } from "react-router-dom";

const HomeCarousel = () => {

  //FUNZIONI RIGURDANTE L'ANIMAZIONE DEL CAROSELO
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  //USO IL CONTEXT
  const { contents, setContents } = useContext(HomePageContext)

  //CREO UNO STATO PER GESTIRE SOLO I DATI DEL CAROSELLO CHE MI SERVONO
  const [ carouselContent, setCarouselContent ] = useState(contents.filter(hero => { return hero.title !== "Jumbotron" && hero.title !== "CHI SIAMO?"} ))

  return (
    <section ref={targetRef} className="relative lg:h-[300vh] h-[130vh]  lg:-my-44 md:-my-72 -my-[300px]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {carouselContent.map((card) => {
            return (
              <Link to={`/${card.title.slice(0, 1)}${card.title.slice(1).toLowerCase()}`} key={card._id}>
                <HomeCarouselCard card={card} />
              </Link>)
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCarousel