function ClassDescription({ currentLesson }) {
  return (
    <>
      <div className="p-8 sm:p-16 lg:p-24">
        <h2 className="text-2xl font-bold lg:text-6xl md:text-4xl font-NCLMonsterBeast text-white">
          {currentLesson.name}
        </h2>

        <p className="mt-4 text-white md:text-2xl">
          {currentLesson.description}
        </p>

        <p className="mt-4 text-white md:text-2xl">
          Giorno: {currentLesson.day}
        </p>

        <p className="mt-4 text-white md:text-2xl">
          Orario: {currentLesson.hour}
        </p>
      </div>
    </>
  );
}

export default ClassDescription;
