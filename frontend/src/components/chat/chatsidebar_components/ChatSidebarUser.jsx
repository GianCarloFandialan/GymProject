import { useContext, useEffect, useState } from "react";
import { getSingleUser } from "../../../services/api";
import { UserDataContext } from "../../../services/context";
import FullPageSpinner from "../../spinners/FullPageSpinner";
import { FaUserCircle } from "react-icons/fa";

function ChatSidebarUser({ user, setChatter }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI CREA UNO STATO PER POTER GESTIRE I DATI DEL SINGOLO UTENTE PRESENTE NELLA SIDEBAR
  const [userChatData, setUserChatData] = useState("");

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //  FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE I CONTATTI
    const fetchSingleUser = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I TRAINERS
        const response = await getSingleUser(user);
        console.log(response.data);
        //AGGIORNO LO STATO DEI DATI SINGOLO UTENTE
        setUserChatData(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei trainers:", error);
      }
    };

    // CHIAMIAMO LA FUNZIONE fetchTrainers SOLO SE L'UTENTE CHE HA ESEGUITO L'ACCESSO NON E' UN TRAINER
    if (!userData.isTrainer) {
      fetchSingleUser();
    } else {
      //AGGIORNO LO STATO DELLO SPINNER
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div>
          {userData.isTrainer ? (
            <li
              className="flex-1 cursor-pointer"
              onClick={() => setChatter(user)}
            >
              <div className="flex py-11 px-5 border-black border-b-[1px] md:py-12 bg-white">
                <div className="w-16 h-16">
                  <FaUserCircle className="rounded-full h-full w-full" />
                </div>
                <div className="ml-5 text-2xl flex items-center">
                  <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    {user.cognome} {user.nome}
                  </p>
                </div>
              </div>
            </li>
          ) : (
            <li
              className="flex-1 cursor-pointer"
              onClick={() => setChatter(userChatData)}
            >
              <div className="flex py-11 px-5 border-black border-b-[1px] md:py-12 bg-white">
                <div className="w-16 h-16">
                  <img
                    className="rounded-full h-full w-full object-cover"
                    src={userChatData.avatar}
                  />
                </div>
                <div className="ml-5 text-2xl flex items-center">
                  <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    {userChatData.cognome} {userChatData.nome}
                  </p>
                </div>
              </div>
            </li>
          )}
        </div>
      )}
    </>
  );
}

export default ChatSidebarUser;
