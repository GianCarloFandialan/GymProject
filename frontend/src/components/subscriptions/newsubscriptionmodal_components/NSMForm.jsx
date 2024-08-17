import CardCVC from "./form_components/CardCVC";
import CardExpireMonth from "./form_components/CardExpireMonth";
import CardExpireYear from "./form_components/CardExpireYear";
import Label from "./form_components/Label";
import SubmitButton from "./form_components/SubmitButton";

function NSMForm() {
  return (
    <form>
      <div className="p-6 pt-0 grid gap-6">
        <div className="grid gap-2">
          <Label html={"name"} content={"Nome"} />
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            id="name"
            placeholder="Inserisci il nome"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label html={"number"} content={"Numero carta"} />
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            id="number"
            placeholder=""
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CardExpireYear />
          <CardExpireMonth />
          <CardCVC />
        </div>
      </div>
      <div className="flex items-center p-6 pt-0">
        <SubmitButton />
      </div>
    </form>
  );
}

export default NSMForm;
