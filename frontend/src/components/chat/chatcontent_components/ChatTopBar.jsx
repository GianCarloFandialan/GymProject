import { useContext } from "react";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { UserDataContext } from "../../../services/context";
import { FaUserCircle } from "react-icons/fa";

function ChatTopBar({ chatter, setChatter }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <div className="bg-white h-[80px] flex justify-between items-center px-5">
      <div>
        {/* ICONA DI UNA FRECCIA CHE AL SUO CLICK IMPOSTA L'INTERLOCUTORE A NULL CHIUDENDO LA CHAT */}
        <TfiArrowCircleLeft
          className="w-10 h-10 cursor-pointer"
          onClick={() => setChatter(null)}
        />
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-lg">
          {chatter.cognome} {chatter.nome}
        </p>
        <div className="w-14 h-14 rounded-full">
          {/* SE L'UTENTE CHE HA EFFETTUATO L'ACCESSO È U NTRAINER, L'INTERLOCUTORE AVRÀ UN'ICONA USER ALTRIMENTI AVRÀ LA FOTO PROFILO DEL TRAINER CON CUI SI STA INTERLOCUENDO */}
          {userData.isTrainer ? (
            <FaUserCircle className="rounded-full h-full w-full" />
          ) : (
            <img
              className="rounded-full h-full w-full object-cover"
              src={chatter.avatar}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatTopBar;
