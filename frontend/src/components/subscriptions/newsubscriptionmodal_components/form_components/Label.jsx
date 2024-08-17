function Label({ html, content }) {
  return (
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
      htmlFor={html}
    >
      {content}
    </label>
  );
}

export default Label;
