import { useEffect, useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import { getUsers } from "../services/api";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import ChatContent from "../components/chat/ChatContent";
import ChatSidebarWelcome from "../components/chat/ChatSidebarWelcome";

function Chat() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MOMEMORIZZARE L'ARRAY DEI TRAINERS
  const [trainers, setTrainers] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMTA API PER OTTENERE I TRAINERS
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //  FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE I CONTATTI
    const fetchTrainers = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I TRAINERS
        const response = await getUsers();
        console.log(
          response.data.filter((trainer) => trainer.isTrainer === true)
        );
        // AGGIORNA LO STATO CON I DATI DEI TRAINERS
        setTrainers(
          response.data.filter((trainer) => trainer.isTrainer === true)
        );
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei trainers:", error);
      }
    };

    // CHIAMIAMO LA FUNZIONE fetchTrainers
    fetchTrainers();
  }, []);

  //SI CREA UNO STATO PER POTER GESTIRE CON QUALE UTENTE SI STA CHATTANDO E DI CONSEGUENZA QUALE CHAT APRIRE
  const [chatter, setChatter] = useState(null);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div className="h-[calc(100vh_-_80px)] flex w-full absolute bottom-0 left-0 right-0 top-[80px]">
          <ChatSidebar trainers={trainers} setChatter={setChatter} />
          {chatter ? (
            <ChatContent chatter={chatter} setChatter={setChatter} />
          ) : (
            <ChatSidebarWelcome />
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
