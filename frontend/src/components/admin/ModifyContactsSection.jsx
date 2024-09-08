import { useEffect, useState } from "react";
import FullPageSpinner from "../spinners/FullPageSpinner";
import AddNewSubscriptionContainer from "./modifysubscriptionssection_components/AddNewSubscriptionContainer";
import { getContacts } from "../../services/api";
import MContactsSCard from "./modifycontactssection_components/MContactsSCard";
import AddNewContactContainer from "./modifycontactssection_components/AddNewContactContainer";

function ModifyContactsSection() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DEI CONTATTI
  const [contacts, setContacts] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE I CONTATTI/DOMANDE
  useEffect(() => {
    //SI AGGIORNA LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE I CONTATTI
    const fetchContacts = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I CONTATTI
        const response = await getContacts();
        //AGGIORNA LO STATO CON I DATI DEI CONTATTI
        setContacts(response.data);
        //SI AGGIORNA LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei contatti: ", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchContacts
    fetchContacts();
  }, []);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <section className="mt-10">
          <div className="pb-4 border-b border-gray-600 ">
            <h3 className="text-4xl font-black leading-6 text-gray-800 mt-24 uppercase pl-3">
              Contatti
            </h3>
          </div>

          <div className="relative mx-auto max-w-7xl ">
            <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
              {/* CARDS DEGLI ABBONAMENTI */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DELL'ABBONAMENTO */}
              {contacts.map((contact) => {
                return (
                  <MContactsSCard
                    key={contact._id}
                    contact={contact}
                    contacts={contacts}
                    setContacts={setContacts}
                  />
                );
              })}
            </div>

            <AddNewContactContainer
              setContacts={setContacts}
              contacts={contacts}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default ModifyContactsSection;
