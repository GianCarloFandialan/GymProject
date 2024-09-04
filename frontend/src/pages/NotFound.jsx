import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Closer from "../components/footer/Closer";
import { useEffect } from "react";

function NotFound() {
  //AL CARICAMENTO DEL COMPONENTE SI SCROLLA LA PAGINA SU
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
        transition={{
          duration: 1.5,
          ease: "backInOut",
        }}
        className="grid min-h-[calc(80vh_-_80px)] place-content-center bg-white px-4"
      >
        <div className="text-center">
          <h1 className="text-[20vh] md:text-[30vh] lg:text-[35vh] font-black text-gray-200">
            404
          </h1>

          <p className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 -mt-10 md:-mt-16 lg:-mt-20">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">Pagina non trovata.</p>

          {/* BOTTONE CHE REINDERIZZA ALLA HOMEPAGE AL SUO CLICK */}
          <Link
            to={"/"}
            className="mt-6 inline-block rounded-xl bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring"
          >
            Torna alla homepage
          </Link>
        </div>
        {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
        <Closer />
      </motion.div>
    </>
  );
}

export default NotFound;
