import { useContext, useEffect } from "react";
import ModifyClassesSection from "../components/admin/ModifyCLassesSection";
import ModifyContactsSection from "../components/admin/ModifyContactsSection";
import ModifyGymSection from "../components/admin/ModifyGymSection";
import ModifyHomeSection from "../components/admin/ModifyHomeSection";
import ModifySubscriptionsSection from "../components/admin/ModifySubscriptionsSection";
import ModifyTrainersSection from "../components/admin/ModifyTrainersSection";
import { IsLoggedInContext, UserDataContext } from "../services/context";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    console.log(isLoggedIn);

    if (!isLoggedIn) {
      navigate("/");
    }

    if (userData.isAdmin) {
      return;
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ModifyHomeSection />
      <ModifyGymSection />
      <ModifyClassesSection />
      <ModifySubscriptionsSection />
      <ModifyTrainersSection />
      <ModifyContactsSection />
    </>
  );
}

export default AdminPage;
