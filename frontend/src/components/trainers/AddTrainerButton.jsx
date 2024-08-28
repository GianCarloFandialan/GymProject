function AddTrainerButton({ trainer, setOpenModal, setSelectedTrainer }) {
  return (
    <button
      className="bg-white font-black px-5 py-3 rounded-xl text-xl"
      onClick={() => {
        setOpenModal(true);
        setSelectedTrainer(trainer);
      }}
    >
      AGGIUNGI TRAINER
    </button>
  );
}

export default AddTrainerButton;
