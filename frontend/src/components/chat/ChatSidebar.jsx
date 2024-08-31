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

  //AL CARICAMENTO DEL COMPONENTE CARICO GLI INTERLOCUTORI DELL'UTENTE CHE HA EFFETTUATO L'ACCESSO, IN CASO DI ERRORE SI REINDERIZZA ALLA HOMEPAGE
  useEffect(() => {
    //NEL CASO DI ERRORE NEL CARICAMENTO DEI DATI DELL'UTENTE CHE ESEGUITO L'ACCESSO, LO USEFFECT REINDERIZZA ALLA HOMEPAGE
    if (!userData) {
      setIsLoading(false);
      navigate("/");
      return;
    }

    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //SE L'UTENTE CHE HA EFFETTUATO L'ACCESSO è UN TRAINER, SI EFFETTUA UNA CHIAMATA PER OTTENERE TUTTI GLI UTENTI CHE LO HANNO SCELTO
    if (userData.isTrainer) {
      //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE I CLIENTI SPICIFICI
      const fetchUsers = async () => {
        try {
          //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI GLI UTENTI
          const response = await getUsers();
          //AGGIORNA LO STATO CON I DATI DEGLI UTENTI FILTRATI PER QUELLI CHE LO HANNO SCELTO COME TRAINER
          setUsers(
            response.data.filter((client) =>
              client.trainerId.includes(userData._id)
            )
          );
          //AGGIORNO LO STATO DELLO SPINNER
          setIsLoading(false);
        } catch (error) {
          //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
          console.error(
            "Errore nella fetch dei clienti interlocutori: ",
            error
          );
        }
      };

      //CHIAMIAMO LA FUNZIONE fetchUsers
      fetchUsers();
    } else {
      //SE L'UTENTE CHE HA EFFETTUATO L'ACCESSO NON è UN TRAINER, SI AGGIORNA LO STATO USERS CON L'ID DEI TRAINERS INTERLOCUTORI SCELTI
      setUsers(userData.trainerId);
      //AGGIORNO LO STATO DELLO SPINNER
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div className="w-screen md:w-[40vw] lg:w-[27vw] absolute overflow-y-scroll h-full">
          <ul className="h-full flex flex-col bg-white">
            {/* GLI ELEMENTI DELLA LISTA <li> SONO GLI INTERLOCUTORI SCELTI DALL'UTENTE */}
            {users.map((user, index) => {
              return (
                <div key={index}>
                  {/* DIFFERENZIO IL MODO IN CUI FORNISCO LA CHIAVE ALL'ELEMENTO "ChatSidebarUser" IN BASE AL TIPO DI UTENTE CHE HA EFFETTUATO L'ACCESSO PERCHÈ I TIPI DI DATI CHE GESTISCONO SONO LEGGERMENTE DIVERSI */}
                  {/* SI PASSA COME PARAMETRO LA FUNZIONE SETCHATTER PER IMPOSTARE QUALE CHAT CARICARE NELLA PAGINA AL CLICK SULL'INTERLOCUTORE */}
                  {/* SI PASSA COME OGGETTO L'INTERLOCUTORE NEL CASO L'UTENTE CHE HA ESEGUIO L'ACCESSO SIA UN TRAINER */}
                  {userData.isTrainer ? (
                    <ChatSidebarUser
                      key={user._id + "chat"}
                      user={user}
                      setChatter={setChatter}
                    />
                  ) : (
                    //SI PASSA COME STRINGA(ID) L'INTERLOCUTORE NEL CASO L'UTENTE CHE HA ESEGUIO L'ACCESSO SIA UN TRAINER
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
