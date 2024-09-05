import { useState } from "react";
import Label from "../../../universals/forms_components/Label";

function CardExpireMonth() {
  const [months, setMonths] = useState([
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ]);

  return (
    <div className="grid gap-2">
      <Label html={"month"} content={"Scadenza"} />
      <select
        type="select"
        className="bg-black border-white border-2 rounded-md text-sm p-1 text-white"
        placeholder="Month"
        id="month"
      >
        {months.map((month) => {
          return (
            <option
              value={`${month}`}
              className="bg-black text-white rounded-md"
              key={month}
            >
              {month}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CardExpireMonth;
