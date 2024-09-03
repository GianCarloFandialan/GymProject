import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../services/context";
import ModifyClassImageButton from "./classesadmin_components/ModifyClassImageButton";
import FullPageSpinner from "../spinners/FullPageSpinner";
import ClassDescription from "./ClassDescription";
import ChangeClassDescriptionForm from "./classesadmin_components/ChangeClassDescriptionForm";

function ClassSectionRight({ lesson }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI USA UNO STATO PER POTER GESTIRE LA PAGINA NEL CASO L'UTENTE CHE ABBIA FATTO L'ACCESSO SIA UN ADMIN
  const [isAdmin, setIsAdmin] = useState();

  //USEEFFECT CHE SI ATTIVA OGNI VOLTA CHE IL CONTEXT USERDATA SI MODIFICA
  useEffect(() => {
    if (userData.isAdmin) {
      setIsAdmin(true);
    } else setIsAdmin(false);
  }, [userData]);

  //SI USA UNA STATO PER POTER GESTIRE SINGOLARMENTE I DATI DELLA CLASSE
  const [currentLesson, setCurrentLesson] = useState();

  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //USEEFFECT AL CARICAMENTO DEL COMPONENTE CHE SALVA IL PARAMETRO NELLO STATO
  useEffect(() => {
    setIsLoading(true);
    setCurrentLesson(lesson);
    setIsLoading(false);
    console.log(lesson);
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
              <div className="relative flex items-center bg-black rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
                <span className="hidden lg:absolute lg:inset-y-0 lg:-end-16 lg:block lg:w-16 lg:bg-black lg:rounded-r-3xl"></span>
                {isAdmin ? (
                  <ChangeClassDescriptionForm
                    currentLesson={currentLesson}
                    setCurrentLesson={setCurrentLesson}
                  />
                ) : (
                  <ClassDescription currentLesson={currentLesson} />
                )}
              </div>

              <div className="relative z-10 lg:py-16">
                <div className="relative h-64 sm:h-80 lg:h-full">
                  <img
                    alt="class image"
                    src={`${currentLesson.cover}`}
                    className="absolute inset-0 h-full w-full object-cover rounded-b-3xl lg:rounded-3xl"
                  />
                  {/* SE L'UTENTE CHE ESEGUITO L'ACCESSO È UN ADMIN COMPARE IL BOTTONE DI MODIFICA DELL'IMMAGINE */}
                  {isAdmin && (
                    <ModifyClassImageButton
                      id={currentLesson._id}
                      currentLesson={currentLesson}
                      setCurrentLesson={setCurrentLesson}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
}

export default ClassSectionRight;
