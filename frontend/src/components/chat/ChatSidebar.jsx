function ChatSidebar({ trainers, setChatter }) {
  return (
    <>
      <div className="w-screen md:w-[40vw] lg:w-[27vw] absolute overflow-y-scroll h-full">
        <ul className="h-full flex flex-col justify-between">
          {trainers.map((trainer) => {
            return (
              <div key={trainer._id + "chat-normal"}>
                <li
                  className="flex-1 cursor-pointer"
                  key={trainer._id + "chat-lg"}
                  onClick={() => setChatter(trainer)}
                >
                  <div className="flex py-11 px-5 border-black border-b-[1px] md:py-12 bg-white">
                    <div className="w-16 h-16">
                      <img
                        className="rounded-full h-full w-full object-cover"
                        src={trainer.avatar}
                      />
                    </div>
                    <div className="ml-5 text-2xl flex items-center">
                      <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                        {trainer.cognome} {trainer.nome}
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ChatSidebar;
