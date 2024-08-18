function SBSubscribeButton({ setOpenModal, setSelectedSubscription, id }) {
  return (
    <button
      href="/pricing"
      type="highlight"
      className="w-full items-center block px-10 py-3.5 text-base font-bold text-center transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-white"
      onClick={() => {
        setOpenModal(true);
        setSelectedSubscription(id);
      }}
    >
      ABBONATI
    </button>
  );
}

export default SBSubscribeButton;
