import "../../../../subscriptions/newsubscriptionmodal_components/form_components/CardNumber.css";
import Label from "../../../../subscriptions/newsubscriptionmodal_components/form_components/Label";

function RegisterCardNumber({ card, setCard }) {
  return (
    <div className="grid gap-2">
      <Label html={"ciao"} content={"Numero carta"} />
      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
        id="ciao"
        required
        min={1000000000000000}
        max={9999999999999999}
        type="number"
        //AL MODIFICARSI DEL VALORE DELL'INPUT, CAMBIA PURE LO STATO
        value={card}
        onChange={(e) => setCard(e.target.value)}
      />
    </div>
  );
}

export default RegisterCardNumber;
