function ModifyButton({ setOpenModal }) {
  return (
    <>
      <button
        className="font-bold border border-black rounded-lg mt-3 mb-1"
        onClick={() => setOpenModal(true)}
      >
        Modifica
      </button>
    </>
  );
}

export default ModifyButton;
