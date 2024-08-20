function MASSMethodButton({ setOpenModal }) {
  return (
    <div className="mt-10 mb-10">
      <button
        className="text-xl font-black border-[1px] border-black rounded-full p-4 hover:text-white hover:bg-black"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Modifica Metodo di Pagamento
      </button>
    </div>
  );
}

export default MASSMethodButton;
