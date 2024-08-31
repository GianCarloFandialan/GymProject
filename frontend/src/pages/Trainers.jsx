import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import FullPageSpinner from "../components/spinners/FullPageSpinner";
import TrainersCard from "../components/trainers/TrainersSectionLeft";
import TrainersSectionLeft from "../components/trainers/TrainersSectionLeft";
import Closer from "../components/footer/Closer";
import TrainerSectionRight from "../components/trainers/TrainerSectionRight";
import AddTrainerModal from "../components/trainers/AddTrainerModal";
import AddSuccessModal from "../components/trainers/AddSuccessModal";

function Trainers() {
  //STATO PER GESTIRE LO SPINNER NEL FRATTEMPO CHE LA CHIAMATA NON È ANCORA TERMINATA
  const [isLoading, setIsLoading] = useState(true);

  //STATO PER MOMEMORIZZARE L'ARRAY DEI TRAINERS
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
        console.error("Errore nella fetch dei trainers:", error);
      }
    };

    //CHIAMIAMO LA FUNZIONE fetchTrainers
    fetchTrainers();
  }, []);

  //SI CREA UNO STATO PER GESTIRE IL MODALE PER GESTIRE L'AGGIUNTA DEL NUOVO TRAINER
  const [openModal, setOpenModal] = useState(false);

  //SI CREA UNO STATO PER GESTIRE IL TRAINER CHE VIENE SELEZIONATO
  const [selectedTrainer, setSelectedTrainer] = useState("");

  //SI CREA UNO STATO PER GESTIRE IL MODALE DELLA CONFERMA DEL NUOVO TRAINER
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  return (
    <>
      {/* SE LA CHIAMATA NON È ANCORA TERMINATA ESCE LO SPINNER ALTRIMENTI SI CARICA IL CONTNEUTO */}
      {isLoading ? (
        <div className="h-screen relative overflow-hidden">
          <FullPageSpinner />
        </div>
      ) : (
        <div className=" lg:w-[calc(100vw_-_140px)] md:w-[calc(100vw_-_100px)] flex flex-col items-center md:mx-auto">
          {openModal && (
            <AddTrainerModal
              setOpenModal={setOpenModal}
              selectedTrainer={selectedTrainer}
              setOpenSuccessModal={setOpenSuccessModal}
            />
          )}
          {openSuccessModal && (
            <AddSuccessModal setOpenSuccessModal={setOpenSuccessModal} />
          )}
          {trainers.map((trainer, index) => {
            if (index % 2 === 0) {
              return (
                <TrainersSectionLeft
                  trainer={trainer}
                  key={trainer._id}
                  setOpenModal={setOpenModal}
                  setSelectedTrainer={setSelectedTrainer}
                />
              );
            } else {
              return (
                <TrainerSectionRight
                  trainer={trainer}
                  key={trainer._id}
                  setOpenModal={setOpenModal}
                  setSelectedTrainer={setSelectedTrainer}
                />
              );
            }
          })}
          <Closer />
        </div>
      )}
    </>
  );
}

export default Trainers;
