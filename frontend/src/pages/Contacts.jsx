import { useEffect, useState } from "react"
import ContactDetails from "../components/contacts/ContactsDetails"
import FullPageSpinner from "../components/spinners/FullPageSpinner"
import { getContacts } from "../services/api"
import Closer from "../components/footer/Closer"

function Contacts() {
  
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true)

  //STATO PER MOMEMORIZZARE L'ARRAY DEI CONTATTI
  const [contacts, setContacts] = useState([])

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMTA API PER OTTENERE I CONTATTI
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true)

    //  FUNZIONE CHE ESEGUE UNA CHIAMTA API PER OTTENERE I CONTATTI
    const fetchContacts = async () => {
      try {
        // EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTATTI
        const response = await getContacts();
        // AGGIORNA LO STATO CON I DATI DEI CONTATTI
        setContacts(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false)        
      } catch (error) {
        // SI LOGGANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei conttti:", error);
      }
    };

    // CHIAMIAMO LA FUNZIONE fetchContacts
    fetchContacts();
  }, [])

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMIANTA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ?
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner/>
        </div>
        :
        <div className="w-[75vw] lg:w-[90vw] mx-auto">
          <h2 className=" mx-auto my-3 font-bold text-2xl md:text-4xl">
            Domande Frequenti:
          </h2>
          {contacts.map(contact => {
            return (
              <ContactDetails key={contact._id} contact={contact}/>
            )
          })}
          <p className="text-lg">
            <span className="font-bold block">Non hai trovato la risposta che cercavi?</span>
            Se le informazioni qui non sono state sufficienti, non esitare a contattarci. Puoi chiamare il nostro numero verde al <span className="font-bold text-green-500 cursor-pointer">800-123-456 </span>o inviare un'email a <span className="font-bold text-blue-500 cursor-pointer">info@gymproject.com</span>. Siamo qui per aiutarti con qualsiasi domanda o chiarimento!
          </p>
          <Closer/>
        </div>
      }
    </>
  )
}

export default Contacts