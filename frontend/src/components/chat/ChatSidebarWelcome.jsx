function ChatSidebarWelcome() {
  return (
    <div className="h-full w-full md:max-w-[calc(100vw_-_40.5vw)] lg:max-w-[calc(100vw_-_27.5vw)] absolute right-0 top-0 flex-col items-center justify-center bg-white hidden md:flex">
      <div className="font-ZENOVAXENO lg:text-7xl md:text-6xl text-4xl text-center ">
        Benvenuto nelle CHAT!
      </div>
      <div className="text-center">
        <span>Premi</span> uno dei trainer presenti per iniziare o continuare la
        conversazione!
      </div>
    </div>
  );
}

export default ChatSidebarWelcome;
