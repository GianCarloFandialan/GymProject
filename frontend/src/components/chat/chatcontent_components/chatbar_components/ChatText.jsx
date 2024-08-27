function ChatText({ newNormalMessagge, setNewNormalMessage }) {
  return (
    <textarea
      rows={1}
      cols={4}
      className="h-10 flex-grow rounded-3xl px-4 focus:outline-none border-[1px] border-gray-300 text-lg font-semibold max-w-full resize-none flex items-center"
      placeholder="Scrivi un messaggio"
      value={newNormalMessagge.content}
      onChange={(e) =>
        setNewNormalMessage({ ...newNormalMessagge, content: e.target.value })
      }
    />
  );
}

export default ChatText;
