function ModalButtonSection({ setOpenModal, content }) {
  return (
    <div className="flex items-center p-6 pt-0 gap-2">
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-white"
        onClick={() => setOpenModal(false)}
      >
        Annulla
      </button>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-white"
        type="submit"
      >
        {content}
      </button>
    </div>
  );
}

export default ModalButtonSection;
