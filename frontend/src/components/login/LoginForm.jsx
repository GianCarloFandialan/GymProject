import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalSuccess from "../universals/modals/ModalSuccess";
import { loginUser } from "../../services/api";
import LoginModalError from "./LoginModalError";
import { IsLoggedInContext } from "../../services/context";

function LoginForm() {
  //SI CREA UNO STATO PER POTER GESTIRE I DATI DI ACCESSO PER IL LOGIN
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  //FUNZIONE PER GESTIRE I CAMBIAMENTI DEGLI INPUT NEL FORM
  const handleChange = (e) => {
    const { name, value } = e.target;

    //SE IL VALORE CHE VIENE MODIFICATO È QUELLO DELLA EMAIL FACCIO SI CHE LA LETTERA INIZIALE SIA MINUSCOLA
    if (name === "email") {
      setLoginData({
        ...loginData,
        email: value.charAt(0).toLowerCase() + value.slice(1),
      });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  //CREO UNO STATO PER POTERMI GESTIRE IL MODALE NEL CASO DI ERRORE DURANTE IL LOGIN
  const [loginError, setLoginError] = useState(false);

  //CREO UNO STATO PER POTERMI GESTIRE IL MODALE NEL CASO LA REGSITRAZIONE SIA AVVENUTA CON SUCCESSSO
  const [success, setSuccess] = useState(null);

  //CREO UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM CHE MI ESEGUE LA FUNZIONE DI LOGIN CREATA CON AXIOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(loginData);
      localStorage.setItem("token", response.token); //MEMORIZZA IL TOKEN DI AUTENTICAZIONE NEL LOCALSTORAGE

      //TRIGGER L'EVENTO STORAGE PER AGGIORNARE LA NAVBAR
      window.dispatchEvent(new Event("storage"));
      //SCATENA UN EVENTO DI STORAGE PER AGGIORNARE COMPONENTI COME LA NAVBAR

      //AGGIORNO LO STATO CHE MI AIUTA A GESTIRE IL MODALE DI ACCESSO CON SUCCESSO
      setSuccess(true);
    } catch (error) {
      //SE L'ERRORE È RELATIVO ALLE CREDENZIALI, MODIFICO LO STATO CHE MI AIUTA AGESTIRE IL MODALE NEL CASO DI CREDENZIALI NON VALIDE
      if (error.response.data.message == `Credenziali non valide`) {
        setLoginError(true);
      } else {
        //ALTRIMENTI SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nel login dell'utente: ", error);
      }
    }
  };

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //USEEFFECT CHE REINDERIZZA NELLA HOMEPAGE SOLO NEL CASO IL LOGIN SIA AVVENUTO CON SUCCESSO
  useEffect(() => {
    if (success == false) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [success]);

  //HOOK PER ACCEDERE AI PARAMETRI DELL'URL CORRENTE
  const location = useLocation();

  //USEEFFECT CHE VIENE TRIGGERATO OGNI VOLTA LA LOCATION E IL NAVIGATE CAMBIANO
  useEffect(() => {
    //SI ESTRAGGONO I PARAMETRI DALL'URL
    const params = new URLSearchParams(location.search);

    //SI CERCA UN PARAMETRO 'TOKEN' NELL'URL
    const token = params.get("token");

    if (token) {
      //SE SI TROVA UN TOKEN, SI SALVA NEL LOCALSTORAGE
      localStorage.setItem("token", token);
      //SI DISPATCHA UN EVENTO 'STORAGE' PER AGGIORNARE ALTRI COMPONENTI CHE POTREBBERO DIPENDERE DAL TOKEN
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("loginStateChange"));
      //SI NAVIGA ALLA HOME PAGE
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <>
      {/* MODALE DI SUCCESSO NEL LOGIN CHE SI APRE SOLO NEL CASO DI SUCCESSO */}
      {/* PASSO COME PARAMETR: LA FUNZIONE PER MODIFICARE LO STATO CHE MI GESTISCE IL MODALE IN CASO DI SUCCESSO ED IL CONTENUTO DEL MODALE*/}
      {success && (
        <ModalSuccess
          setSuccess={setSuccess}
          textHeader={"Bentornato in GYMPROJECT!"}
          textBody={"Il login è avvenuto con successo!"}
        />
      )}
      {/* MODALE NEL CASO DI ERRORE CAUSATO DA CREDENZIALI NON VALIDE NEL LOGIN */}
      {/* PASSO COME PARAMETR: LA FUNZIONE PER MODIFICARE LO STATO CHE MI GESTISCE IL MODALE IN CASO DI ERRORE ED IL CONTENUTO DEL MODALE*/}
      {loginError && (
        <LoginModalError
          text={"Password o Email errata, ritenta"}
          setLoginError={setLoginError}
        />
      )}
      <form className=" " onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-600"
          >
            {" "}
            Indirizzo Email{" "}
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required=""
              placeholder="Inserisci l'email"
              //IL VALORE È LEGATO ALLO STATO DEI DATI DI LOGIN, AL CAMBIAMENTO DEL VALORE DELLA CASELLA CAMBIA ANCHE LO STATO
              onChange={handleChange}
              value={loginData.email}
              className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-600"
          >
            {" "}
            Password{" "}
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required=""
              placeholder="Inserisci la password"
              //IL VALORE È LEGATO ALLO STATO DEI DATI DI LOGIN, AL CAMBIAMENTO DEL VALORE DELLA CASELLA CAMBIA ANCHE LO STATO
              onChange={handleChange}
              value={loginData.password}
              className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center flex-[4]">
            <p className="text-center text-sm text-gray-500">
              Non hai un account?
              {/* BOTTONE CHE REINDERIZZA ALLA PAGINE DI REGISTRAZIONE IN CASO L'UTENTE NON ABBIA ANCORA UN ACCOUNT */}
              <Link
                to={"/registrazione"}
                className="underline ml-1 font-bold"
                href="#"
              >
                Registrati
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-black rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex-1"
          >
            Entra
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
