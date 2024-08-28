import { useContext, useEffect, useState } from "react";
import ChatSidebarUser from "./chatsidebar_components/ChatSidebarUser";
import { UserDataContext } from "../../services/context";
import FullPageSpinner from "../spinners/FullPageSpinner";
import { getUsers } from "../../services/api";
import { useNavigate } from "react-router-dom";

function ChatSidebar({ setChatter }) {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MOMEMORIZZARE L'ARRAY DEI TRAINERS
  const [users, setUsers] = useState([]);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  useEffect(() => {
    //NEL CASO DI ERRORE RIPORTO L'UTENTE NELLA HOMEPAGE
    if (!userData) {
      setIsLoading(false);
      navigate("/");
      return;
    }

    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //SE L'UTENTE È UN TRAINER OTTENGO TUTTI I CLIENTI CHE HANNO COME TRAINER, IL TRAINER STESSO
    if (userData.isTrainer) {
      //  FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE I CLIENTI SPICIFICI
      const fetchUsers = async () => {
        try {
          // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI GLI UTENTI
          const response = await getUsers();
          console.log(
            response.data.filter((client) =>
              client.trainerId.includes(userData._id)
            )
          );
          // AGGIORNA LO STATO CON I DATI DEGLI UTENTI
          setUsers(
            response.data.filter((client) =>
              client.trainerId.includes(userData._id)
            )
          );
          //AGGIORNO LO STATO DELLO SPINNER
          setIsLoading(false);
        } catch (error) {
          // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
          console.error("Errore nella fetch dei trainers:", error);
        }
      };

      // CHIAMIAMO LA FUNZIONE fetchUsers
      fetchUsers();
    } else {
      setUsers(userData.trainerId);
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
        <div className="w-screen md:w-[40vw] lg:w-[27vw] absolute overflow-y-scroll h-full">
          <ul className="h-full flex flex-col bg-white">
            {users.map((user, index) => {
              return (
                <div key={index}>
                  {userData.isTrainer ? (
                    <ChatSidebarUser
                      key={user._id + "chat"}
                      user={user}
                      setChatter={setChatter}
                    />
                  ) : (
                    <ChatSidebarUser
                      key={user + "chat"}
                      user={user}
                      setChatter={setChatter}
                    />
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default ChatSidebar;
