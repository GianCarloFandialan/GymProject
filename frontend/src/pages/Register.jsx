import { useContext, useEffect } from "react";
import RegisterForm from "../components/register/RegisterForm";
import RegisterHeroImg from "../components/register/RegisterHeroImg";
import RegisterHeroTxt from "../components/register/RegisterHeroTxt";
import RegisterLogin from "../components/register/RegisterLogin";
import { motion } from "framer-motion";
import { IsLoggedInContext } from "../services/context";
import { useNavigate } from "react-router-dom";

function Register() {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  //SE L'UTENTE HA GIÀ ESEGUITO L'ACCESSO VIENE REINDIRIZZATO NELLA HOMEPAGE
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  //AL CARICAMENTO DEL COMPONENTE SI SCROLLA LA PAGINA SU
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      initial={{ opacity: 0, y: "-35vh" }}
      whileInView={{ opacity: 1, y: "0" }}
      transition={{ duration: 1.4 }}
      className="bg-white lg:-mt-[80px]"
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* HERO DELLA REGISTRAZIONE */}
        <RegisterHeroImg />

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            {/* TESTO DELLA HERO */}
            <RegisterHeroTxt />

            {/* FORM DI REGISTRAZIONE ALLA PALESTRA */}
            <RegisterForm />

            {/* COMPONENTE CHE TI REINDERIZZA ALLA PAGINE DI LOGIN */}
            <RegisterLogin />
          </div>
        </main>
      </div>
    </motion.section>
  );
}

export default Register;
