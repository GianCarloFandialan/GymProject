function DeleteButton({ setOpenDeleteModal }) {
  return (
    <>
      <button
        className="font-bold bg-red-700 rounded-lg mt-3 mb-1 text-white"
        onClick={() => setOpenDeleteModal(true)}
      >
        Elimina
      </button>
    </>
  );
}

export default DeleteButton;
