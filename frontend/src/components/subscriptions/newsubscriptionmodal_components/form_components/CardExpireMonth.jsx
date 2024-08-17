import Label from "./Label";

function CardExpireMonth(params) {
  return (
    <div className="grid gap-2">
      <Label html={"month"} content={"Scadenza"} />
      <select
        type="select"
        className="bg-black border-white border-2 rounded-md text-sm p-1 text-white"
        placeholder="Month"
        id="month"
      >
        <option value="Prova" className="bg-black text-white rounded-md">
          prova
        </option>
        <option value="Prova" className="bg-black text-white rounded-md">
          prova2
        </option>
      </select>
    </div>
  );
}

export default CardExpireMonth;
