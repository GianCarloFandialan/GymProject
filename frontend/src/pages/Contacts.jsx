import { useEffect, useState } from "react";
import ContactDetails from "../components/contacts/ContactsDetails";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import { getContacts } from "../services/api";
import Closer from "../components/footer/Closer";
import { motion } from "framer-motion";

function Contacts() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DEI CONTATTI
  const [contacts, setContacts] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE I CONTATTI/DOMANDE
  useEffect(() => {
    //SI SCROLLA LA PAGINA SU
    window.scrollTo(0, 0);

    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE I CONTATTI
    const fetchContacts = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTATTI
        const response = await getContacts();
        //AGGIORNA LO STATO CON I DATI DEI CONTATTI
        setContacts(response.data);
        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei conttti: ", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchContacts
    fetchContacts();
  }, []);

  //SI IMPOSTANO LE VARIBILI PER L'ANIMAZIONE DELLA LISTA DELLA NAVBAR
  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <motion.div
          //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
          variants={navLinksVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-[75vw] lg:w-[90vw] mx-auto"
        >
          <h2 className=" mx-auto my-3 font-bold text-2xl md:text-4xl">
            Domande Frequenti:
          </h2>
          {/* SI MOSTRANO I CONTATTI TRAMITE IL COMPONENTE "ContactDetails" */}
          {/* SI PASSA COME PARAMETRO L'OGGETTO CONTATTO */}
          {contacts.map((contact) => {
            return <ContactDetails key={contact._id} contact={contact} />;
          })}
          <p className="text-lg">
            <span className="font-bold block">
              Non hai trovato la risposta che cercavi?
            </span>
            Se le informazioni qui non sono state sufficienti, non esitare a
            contattarci. Puoi chiamare il nostro numero verde al{" "}
            <span className="font-bold text-green-500 cursor-pointer">
              800-123-456{" "}
            </span>
            o inviare un'email a{" "}
            <span className="font-bold text-blue-500 cursor-pointer">
              info@gymproject.com
            </span>
            . Siamo qui per aiutarti con qualsiasi domanda o chiarimento!
          </p>
          {/* SEZIONE CHE REINDERIZZA ALLE PAGINE SOCIAL DELLA PALESTRA */}
          <Closer />
        </motion.div>
      )}
    </>
  );
}

export default Contacts;
