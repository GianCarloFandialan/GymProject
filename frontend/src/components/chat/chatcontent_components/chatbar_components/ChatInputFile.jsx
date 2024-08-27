import { useRef } from "react";
import { GoPaperclip } from "react-icons/go";

const ChatInputFile = () => {
  // CREA UN RIFERIMENTO ALL'ELEMENTO INPUT
  const fileInputRef = useRef(null);

  // FUNZIONE PER GESTIRE IL CLICK SUL PULSANTE
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // FUNZIONE PER GESTIRE LA SELEZIONE DEL FILE
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // QUI PUOI GESTIRE IL FILE SELEZIONATO
      console.log("File selezionato:", file.name);
    }
  };

  return (
    <div>
      {/* INPUT DI TIPO FILE NASCOSTO */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* PULSANTE PERSONALIZZATO */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-white hover:bg-gray-700 font-bold py-2 px-4 rounded-3xl h-10"
      >
        <GoPaperclip />
      </button>
    </div>
  );
};

export default ChatInputFile;
