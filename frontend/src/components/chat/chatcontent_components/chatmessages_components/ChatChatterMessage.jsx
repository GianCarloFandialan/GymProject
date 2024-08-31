function ChatChatterMessage({ chatmessage }) {
  return (
    <li className="flex flex-col font-semibold items-start mb-10">
      <div className="mb-1 bg-gray-900 rounded-3xl p-4 rounded-bl-none text-lg text-white lg:max-w-[60%] md:max-w-[80%] max-w-[90%]">
        {/* SE IL CONTENUTO DEL MESSAGGIO è UN'IMMAGINE VIENE MOSTRATO L'IMMAGINE STESSA ALTRIMENTI VIENE MOSTRATO IL MESSAGGIO STESSO */}
        {chatmessage.content.startsWith("https://res.cloudinary.com") ? (
          <img src={chatmessage.content} alt="immagine mandata" />
        ) : (
          <div>{chatmessage.content}</div>
        )}
      </div>
      <div className="text-xs">
        {chatmessage.createdAt.slice(8, 10)}/{chatmessage.createdAt.slice(5, 7)}
        /{chatmessage.createdAt.slice(0, 4)} alle{" "}
        {chatmessage.createdAt.slice(11, 16)}
      </div>
    </li>
  );
}

export default ChatChatterMessage;
