function RemoveBenefitButton({ setOpenRemoveBenefitModal }) {
  return (
    <>
      <button
        className="font-bold bg-orange-700 rounded-lg mt-3 mb-1 text-white flex-1"
        onClick={() => setOpenRemoveBenefitModal(true)}
      >
        Elimina benefit
      </button>
    </>
  );
}

export default RemoveBenefitButton;
