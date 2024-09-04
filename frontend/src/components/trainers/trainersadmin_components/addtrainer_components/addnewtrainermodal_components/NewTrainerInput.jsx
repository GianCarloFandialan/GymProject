import Label from "../../../../subscriptions/newsubscriptionmodal_components/form_components/Label";

function NewTrainerInput({
  element,
  placeholder,
  content,
  handleChange,
  newTrainer,
}) {
  return (
    <div className="grid gap-2">
      <Label html={element} content={content} />
      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
        id={element}
        placeholder={placeholder}
        required
        name={element}
        onChange={handleChange}
        value={newTrainer.element}
      />
    </div>
  );
}

export default NewTrainerInput;
