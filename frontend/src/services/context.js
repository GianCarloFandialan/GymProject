//CREO IL CONTEXT
import { createContext } from "react";

//CONTEXT CHE MI GESTIRÀ I POST NELLA PAGINA
export const HomePageContext = createContext(null);

//CONTEXT CHE AIUTA A GESTIRE SE L'UTENTE HA ESEGUITO L'ACCESSO O NO
export const IsLoggedInContext = createContext(null);

//CONTEXT CHE AIUTA A GESTIRE I DATI DELL'UTENTE NEL CASO ESSO ABBIA EFFETTUATO L'ACCESSO
export const UserDataContext = createContext(null);

//CONTEXT PER POTER GESTIRE IL MODALE NEL CASO SIA AVVENUTO CON SUCCESSO IL LOGOUT
export const LogoutSuccessContext = createContext(null)