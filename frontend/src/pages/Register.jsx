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

  useEffect(() => {
    console.log(isLoggedIn);

    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <motion.section
      initial={{ opacity: 0, y: "-35vh" }}
      whileInView={{ opacity: 1, y: "0" }}
      transition={{ duration: 1.4 }}
      className="bg-white lg:-mt-[80px]"
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <RegisterHeroImg />

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <RegisterHeroTxt />

            <RegisterForm />

            <RegisterLogin />
          </div>
        </main>
      </div>
    </motion.section>
  );
}

export default Register;
