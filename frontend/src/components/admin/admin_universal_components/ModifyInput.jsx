import Label from "../../universals/forms_components/Label";

function ModifyInput({ element, content, handleChange, value }) {
  return (
    <div className="grid gap-2">
      <Label html={element} content={content} />
      <textarea
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
        id={element}
        required
        name={element}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default ModifyInput;
