import { useEffect, useState } from "react";

function SubmitButton({ cardData, setCardData }) {
  //CREO UNO STATO PER POTERMI GESTIRE IL CARICAMENTO NEL FRATTEMPO CHE SI DEFINISCE LA DATA
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setCardData({ ...cardData, start: date });
    setIsLoading(false);
  }, []);

  //VARIBAILI CHE MI SERVONO PER INSERIE LA DATA DI INIZIO DELLA SOTTOSCRIZIONE DELL'ABBONAMENTO
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (dd < 10) {
    dd = "0" + dd;
  }

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (mm < 10) {
    mm = "0" + mm;
  }

  var date = yyyy + "-" + mm + "-" + dd;

  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-white"
      type="submit"
    >
      Continua
    </button>
  );
}

export default SubmitButton;
