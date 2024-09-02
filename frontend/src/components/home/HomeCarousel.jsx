import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import HomeCarouselCard from "./homecarousel_components/HomeCarouselCard";
import { Link } from "react-router-dom";

const HomeCarousel = ({ contents, setContents }) => {
  //COSTANTI RIGURDANTI L'ANIMAZIONE DEL CAROSELLO
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  //CREO UNO STATO PER GESTIRE SOLO I DATI DEL CAROSELLO CHE MI SERVONO
  const [carouselContent, setCarouselContent] = useState(
    contents.filter((hero) => {
      return hero.title !== "Jumbotron" && hero.title !== "CHI SIAMO?";
    })
  );

  return (
    <section
      ref={targetRef}
      className="relative h-[170vh] lg:h-[300vh] md:h-[130vh] lg:-my-44 md:-my-72 -my-[200px]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {/* SI MOSTRANO I CONENUTI DEL CAROSELLO TRAMITE IL COMPONENTE "HomeCarouselCard" CHE AL CLICK REINDERIZZANO ALLA SEZIONE SPECIFICATA */}
          {carouselContent.map((card) => {
            return (
              <Link
                to={`/${card.title.slice(0, 1)}${card.title
                  .slice(1)
                  .toLowerCase()}`}
                key={card._id}
              >
                <HomeCarouselCard card={card} />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCarousel;
