import { useContext } from "react"
import { UserDataContext } from "../services/context"

function MyAccount() {

  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext)

  return (
    <>ciao</>
  )
}

export default MyAccount