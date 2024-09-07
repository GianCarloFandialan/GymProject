import { useEffect, useState } from "react";
import FullPageSpinner from "../spinners/FullPageSpinner";
import MTSCard from "./modifytrainerssection_components/MTSCard";
import { getUsers } from "../../services/api";
import AddNewTrainerContainer from "./modifytrainerssection_components/AddNewTrainerContainer";

function ModifyTrainersSection() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MEMORIZZARE L'ARRAY DEI TRAINERS
  const [trainers, setTrainers] = useState([]);

  //AL CARICAMENTO DEL COMPONENTE SI ESEGUE UNA CHIAMATA API PER OTTENERE I TRAINERS
  useEffect(() => {
    //AGGIORNO LO STATO DELLO SPINNER
    setIsLoading(true);

    //FUNZIONE CHE ESEGUE UNA CHIAMATA API PER OTTENERE I CONTATTI
    const fetchTrainers = async () => {
      try {
        //EFFETTUA UNA RICHIESTA GET AL BACKEND PER OTTENERE TUTTI I TRAINERS
        const response = await getUsers();
        //AGGIORNA LO STATO CON I DATI DEI TRAINERS
        setTrainers(
          response.data.filter((trainer) => trainer.isTrainer === true)
        );

        //AGGIORNO LO STATO DELLO SPINNER
        setIsLoading(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella fetch dei trainers: ", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchTrainers
    fetchTrainers();
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
              Trainers
            </h3>
          </div>

          <div className="relative mx-auto max-w-7xl ">
            <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none ">
              {/* CARDS DEI TRAINER */}
              {/* SI PASSA COME PARAMETRO L'OGGETTO DEI CONENUTI DEL TRAINER */}
              {trainers.map((trainer) => {
                return (
                  <MTSCard
                    key={trainer._id}
                    trainer={trainer}
                    trainers={trainers}
                    setTrainers={setTrainers}
                  />
                );
              })}
            </div>

            <AddNewTrainerContainer
              setTrainers={setTrainers}
              trainers={trainers}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default ModifyTrainersSection;
