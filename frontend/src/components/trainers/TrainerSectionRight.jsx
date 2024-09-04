import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { IsLoggedInContext, UserDataContext } from "../../services/context";
import ChatTrainerButton from "./trainersection_components/ChatTrainerButton";
import AddTrainerButton from "./trainersection_components/AddTrainerButton";
import TrainerSpecializationList from "./trainersection_components/TrainerSpecializationList";
import ChangeSpecializationsForm from "./trainersadmin_components/ChangeSpecializationsForm";
import FullPageSpinner from "../spinners/FullPageSpinner";
import TrainerAvatar from "./trainersection_components/TrainerAvatar";
import RemoveTrainerButton from "./trainersadmin_components/RemoveTrainerButton";

function TrainerSectionRight({
  trainer,
  setOpenModal,
  setSelectedTrainer,
  setTrainers,
  trainers,
}) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  //SI USA UNO STATO PER POTER GESTIRE LA PAGINA NEL CASO L'UTENTE CHE ABBIA FATTO L'ACCESSO SIA UN ADMIN
  const [isAdmin, setIsAdmin] = useState();

  //USEEFFECT CHE SI ATTIVA OGNI VOLTA CHE IL CONTEXT USERDATA SI MODIFICA
  useEffect(() => {
    if (userData.isAdmin) {
      setIsAdmin(true);
    } else setIsAdmin(false);
  }, [userData]);

  //SI USA UNA STATO PER POTER GESTIRE SINGOLARMENTE I DATI DELLA CLASSE
  const [currentTrainer, setCurrentTrainer] = useState();

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //USEEFFECT AL CARICAMENTO DEL COMPONENTE CHE SALVA IL PARAMETRO NELLO STATO
  useEffect(() => {
    setIsLoading(true);
    setCurrentTrainer(trainer);
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTENUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <motion.section
          //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            amount: "all",
            margin: "400px",
          }}
          transition={{ duration: 1.5 }}
          className="min-w-[85vw]"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
              <div className="relative flex items-center bg-black rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none justify-center">
                <span className="hidden lg:absolute lg:inset-y-0 lg:-end-16 lg:block lg:w-16 lg:bg-black lg:rounded-r-3xl"></span>

                <div className="p-8 sm:p-16 lg:p-24 w-full">
                  <h2 className="text-2xl font-bold lg:text-6xl md:text-4xl font-NCLMonsterBeast text-white text-center">
                    {trainer.nome} {trainer.cognome}
                  </h2>

                  {/* SE L'UTENTE È UN ADMIN COMPARE UN FORM IN CUI È POSSIBILE ATTUARE DELLE MODIFICHE SUL TRAINER */}
                  {/* SI PASSANO COME PARAMETRI LE SPECIALIZZAZIONI DEL TRAINER, IL TRAINER STESSO E LA FUNZIONE PER GESTIRE IL TRAINER SPECIFICO */}
                  {isAdmin ? (
                    <ChangeSpecializationsForm
                      specializations={trainer.spcialization}
                      setCurrentTrainer={setCurrentTrainer}
                      currentTrainer={currentTrainer}
                    />
                  ) : (
                    <>
                      {/* LISTA DELLE SPECIALIZZAZIONI DELLLE SPECIALIZZAZIONI DEL TRAINER */}
                      <TrainerSpecializationList
                        specializations={trainer.spcialization}
                        setCurrentTrainer={setCurrentTrainer}
                        currentTrainer={currentTrainer}
                      />
                      {/* SE L'UTENTE HA ESEGUITO L'ACCESSO */}
                      {isLoggedIn && (
                        <>
                          {/* SE L'UTENTE NON è UN TRAINER */}
                          {!userData.isTrainer && (
                            <>
                              {/* SE L'UTENTE HA GIà AGGIUNTO IL TRAINER ESCE IL BOTTONE CHAT ALTRIMENTI QUQELLO PER AGGIUNGERLO */}
                              {userData.trainerId.includes(trainer._id) ? (
                                <ChatTrainerButton />
                              ) : (
                                <AddTrainerButton
                                  trainer={trainer}
                                  setOpenModal={setOpenModal}
                                  setSelectedTrainer={setSelectedTrainer}
                                />
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {/* SE L'UTENTE CHE HA ESEUITO L'ACCESSO È UN ADMIN, PUO RIMUOVERE IL TRAINER */}
                  {/* SI PASSANO COME PARAMETRI: L'ID DEL TRAINER, LO STATO DEI TRAINER DELLA PAGINA CON ANESSA FUNZIONE */}
                  {isAdmin && (
                    <RemoveTrainerButton
                      id={currentTrainer._id}
                      setTrainers={setTrainers}
                      trainers={trainers}
                    />
                  )}
                </div>
              </div>

              {/* AVATAR DEL TRAINER */}
              <TrainerAvatar
                avatar={trainer.avatar}
                rounded={"rounded-b-3xl"}
              />
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
}

export default TrainerSectionRight;
