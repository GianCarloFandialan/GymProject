import { motion } from "framer-motion";
import { useContext } from "react";
import { UserDataContext } from "../../services/context";
import { Link } from "react-router-dom";

function TrainerSectionRight({ trainer }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <motion.section
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

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold lg:text-6xl md:text-4xl font-NCLMonsterBeast text-white">
                {trainer.nome} {trainer.cognome}
              </h2>

              <ul role="list" className="pt-6 my-6 space-y-6 border-t">
                {trainer.spcialization.map((spcialization) => {
                  return (
                    <li className="flex" key={spcialization}>
                      <div className="inline-flex items-center min-w-6 h-6 bg-white rounded-full">
                        <svg
                          className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <span className="ml-3 text-white lg:text-2xl">
                        {spcialization}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {!userData.isTrainer && (
                <Link
                  to={"/chat"}
                  className="bg-white font-black px-5 py-3 rounded-xl text-xl"
                >
                  CHAT
                </Link>
              )}
            </div>
          </div>

          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt=""
                src={`${trainer.avatar}`}
                className="absolute inset-0 h-full w-full object-cover rounded-b-3xl lg:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default TrainerSectionRight;
