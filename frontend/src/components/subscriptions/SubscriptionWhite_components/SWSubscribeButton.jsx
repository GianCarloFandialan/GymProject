function SWSubscribeButton({ setOpenModal, setSelectedSubscription, id }) {
  return (
    <button
      type="highlight"
      className="w-full items-center block px-10 py-3.5 text-base font-bold  text-center transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-black text-white"
      onClick={() => {
        //IMPOSTA L'ABBONAMENTO COME QUELLO SELEZIONATO
        setSelectedSubscription(id);
        //APRE IL MODALE PER ABBONARSI
        setOpenModal(true);
      }}
    >
      ABBONATI
    </button>
  );
}

export default SWSubscribeButton;
