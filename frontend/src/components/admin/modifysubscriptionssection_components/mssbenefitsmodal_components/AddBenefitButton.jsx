function AddBenefitButton({ setOpenAddBenefitModal }) {
  return (
    <>
      <button
        className="font-bold bg-green-700 rounded-lg mt-3 mb-1 text-white flex-1"
        onClick={() => setOpenAddBenefitModal(true)}
      >
        Aggiungi benefit
      </button>
    </>
  );
}

export default AddBenefitButton;
