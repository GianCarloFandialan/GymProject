import { motion } from "framer-motion";

function ClassSectionLeft( { lesson } ) {

  return(
    <motion.section 
      initial={{ opacity:0, x: -70}} 
      whileInView={{ opacity:1, x: 0 }}
      viewport={{
        amount: "all",
        margin: "400px", 
      }}
      transition={{duration: 1.5,}}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt=""
                src={`${lesson.cover}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="relative flex items-center bg-black">
            <span
              className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-black"
            ></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold lg:text-6xl md:text-4xl font-NCLMonsterBeast text-white">
                {lesson.name}
              </h2>

              <p className="mt-4 text-white md:text-2xl">
                {lesson.description}
              </p>

              <p className="mt-4 text-white md:text-2xl">
                Giorno: {lesson.day}
              </p>

              <p className="mt-4 text-white md:text-2xl">
                Orario: {lesson.hour}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default ClassSectionLeft