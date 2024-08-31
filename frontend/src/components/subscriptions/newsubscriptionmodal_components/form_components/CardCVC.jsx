import Label from "./Label";
//import "./CardNumber.css";

function CardCVC() {
  return (
    <div className="grid gap-2">
      <Label html={"cvc"} content={"CVC"} />
      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
        id="cvc"
        placeholder="CVC"
        required
        type="number"
        min={100}
        max={999}
      />
    </div>
  );
}

export default CardCVC;
