import { useContext, useEffect } from "react";
import LoginForm from "../components/login/LoginForm";
import GoogleButton from "../components/universals/buttons/GoogleButton";
import { motion } from "framer-motion";
import { IsLoggedInContext } from "../services/context";
import { useNavigate } from "react-router-dom";

function Login() {
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
    <>
      <motion.section
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
        transition={{
          duration: 0.8,
          ease: "backInOut",
        }}
        className="lg:h-[calc(95vh_-_80px)] flex justify-center items-center flex-col h-[calc(100vh_-_80px)]"
      >
        <h2 className="font-bold text-5xl mb-3 font-NCLMonsterBeast shadow-sm">
          Login
        </h2>
        <div className="w-[90vw] md:w-[60vw] lg:w-[30vw] p-10 rounded-3xl shadow-2xl">
          <LoginForm />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-neutral-600 bg-white"> Oppure </span>
            </div>
          </div>
          <div>
            <GoogleButton text={"Login"} />
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default Login;
