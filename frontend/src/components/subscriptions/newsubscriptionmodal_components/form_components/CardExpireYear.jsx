import { useEffect, useState } from "react";
import Label from "../../../universals/forms_components/Label";

function CardExpireYear() {
  //SI CREA UNO STATO PER POTER GESTIRE IL NUMERO DI OPZION ICHE SI POSSONO SELEZIONARE DEGLI ANNI
  const [years, setYears] = useState("");

  //CREO UNO STATO PER POTERMI GESTIRE IL CARICAMENTO NEL FRATTEMPO CHE SI DEFINISCONO BENE GLI ANNI NELLE OPTION
  const [isLoading, setIsLoading] = useState(true);

  var currentYear = new Date().getFullYear();

  let yearArray = [];

  for (let i = 0; i < 11; i++) {
    yearArray.push(currentYear + i);
  }

  //AL CARICAMENTO DEL COMPONENTE IMPOSTA LE OPZIONI DEGLI ANNI
  useEffect(() => {
    setIsLoading(true);
    setYears(yearArray);
    setIsLoading(false);
  }, []);

  return (
    <div className="grid gap-2">
      <Label html={"year"} content={"Anno"} />
      <select
        type="select"
        className="bg-black border-white border-2 rounded-md text-sm p-1 text-white"
        placeholder="Month"
        id="year"
      >
        {isLoading ? (
          <>Loading </>
        ) : (
          <>
            {years.map((year) => {
              return (
                <option
                  value={`${year}`}
                  className="bg-black text-white rounded-md"
                  key={year}
                >
                  {year}
                </option>
              );
            })}
          </>
        )}
      </select>
    </div>
  );
}

export default CardExpireYear;
