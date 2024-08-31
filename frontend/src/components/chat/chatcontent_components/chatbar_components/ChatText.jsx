function ChatText({ newNormalMessagge, setNewNormalMessage }) {
  return (
    <textarea
      rows={1}
      cols={4}
      className="h-10 flex-grow rounded-3xl px-4 focus:outline-none border-[1px] border-gray-300 text-lg font-semibold max-w-full resize-none flex items-center"
      placeholder="Scrivi un messaggio"
      //IMPOSTO COME VALORE DELL'INPUT IL VALORE DELLO STATO newNormalMessagge RISPETTIVO AL CONTENUTO
      value={newNormalMessagge.content}
      //AL CAMBIAMENTO DI VALORE CORRISPONDE UNA MODIFICA DELLO STATO newNormalMessagge
      onChange={(e) =>
        setNewNormalMessage({ ...newNormalMessagge, content: e.target.value })
      }
    />
  );
}

export default ChatText;
