import { useContext, useEffect } from "react";
import Closer from "../components/footer/Closer";
import MyAccounFirstSection from "../components/myaccount/MyAccountFirstSection";
import MyAccountSecondSection from "../components/myaccount/MyAccountSecondSection";
import { IsLoggedInContext, UserDataContext } from "../services/context";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  //USEEFFECT AL CARCIAMENTO DEL COMPONENTE CHE, NEL CASO IN CUI L'UTENTE NON HA ESEGUITO L'ACCESSO OPPURE È UN TRAINER REINDERIZZA ALLA HOMEPAGE
  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    if (!isLoggedIn) {
      navigate("/");
    }

    if (userData.isTrainer) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* IL CONTENUTO PRINCIPALE VIENE SUDDIVISO IN DUE SEZIONI */}
      <main className="-mb-20">
        {/* PRIMA SEZIONE */}
        <MyAccounFirstSection />
        {/* SECONDA SEZIONE */}
        <MyAccountSecondSection />
      </main>
      {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
      <Closer />
    </>
  );
}

export default MyAccount;
