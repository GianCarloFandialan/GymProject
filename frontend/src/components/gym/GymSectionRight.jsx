import { motion } from "framer-motion";

function GymSectionRight( { gym } ) {

  return(
    <motion.section 
      initial={{ opacity:0, x: 60}} 
      whileInView={{ opacity:1, x: 0 }}
      viewport={{
        amount: "all",
        margin: "400px", 
      }}
      transition={{duration: 1.5,}}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">

          <div className="relative flex items-center bg-black rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none ">
            <span
              className="hidden lg:absolute lg:inset-y-0 lg:-end-16 lg:block lg:w-16 lg:bg-black lg:rounded-r-3xl"
            ></span>

            <div className="p-8 sm:p-16 lg:p-24">
              <h2 className="text-2xl font-bold lg:text-6xl md:text-4xl font-NCLMonsterBeast text-white">
                {gym.name}
              </h2>

              <p className="mt-4 text-white md:text-2xl">
                tel: {gym.tel}
              </p>

              <p className="mt-4 text-white md:text-2xl">
                Indirizzo: {gym.address}
              </p>

              <p className="mt-4 text-white md:text-2xl">
                Orario: {gym.hours}
              </p>
            </div>
          </div>

          <div className="relative z-10 lg:py-16">
            <div className="relative h-64 sm:h-80 lg:h-full">
              <img
                alt=""
                src={`${gym.cover}`}
                className="absolute inset-0 h-full w-full object-cover rounded-b-3xl lg:rounded-3xl"
              />
            </div>
          </div>

        </div>
      </div>
    </motion.section >
  )
}

export default GymSectionRight