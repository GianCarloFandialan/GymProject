const HomeCarouselCard = ({ card }) => {

  return (
    <>
      <div
        key={card._id}
        className="group relative lg:h-[450px] lg:w-[450px] md:h-[350px] md:w-[350px] h-[200px] w-[200px] overflow-hidden bg-black block"
      >
        <img
          alt="card image"
          src={`${card.cover}`}
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-red-500">GYMPROJECT</p>

          <p className="lg:text-4xl font-bold text-white sm:text-2xl">{card.title}</p>

          <div className="md:mt-32 sm:mt-48 lg:mt-48">
            <div
              className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
            >
              <p className="lg:text-2xl text-sm md:text-lg text-white">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default HomeCarouselCard