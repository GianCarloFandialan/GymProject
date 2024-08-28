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

  //SE L'UTENTE NON HA ESEGUITO L'ACCESSO OPPURE è UN TRAINER VIENE REINDIRIZZATO ALLA HOMEPAGE
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (userData.isTrainer) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <main className="-mb-20">
        <MyAccounFirstSection />
        <MyAccountSecondSection />
      </main>
      <Closer />
    </>
  );
}

export default MyAccount;
