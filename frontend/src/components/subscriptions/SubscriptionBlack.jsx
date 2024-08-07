import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function SubscriptionBlack( {subscription} ) {
  return (
    <motion.div 
      whileHover="hover"
      transition={{
        duration: 0.5,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.2,
        },
        viewport:{
          amount: "all",
          margin : "400px"
        }
      }} 
      initial={{ opacity:0, x: 70}} 
      whileInView={{ opacity:1, x: 0 }}
      className="relative flex flex-col p-8 bg-black rounded-2xl shadow-2xl hover:z-20"
    >
      <div className="relative flex-1">
        <h3 className="text-xl font-semibold text-white">
          {subscription.name}
        </h3>
        <p className="flex items-baseline mt-4 text-white ">
          <span className="text-5xl font-extrabold tracking-tight">€{subscription.price}</span>
          <span className="ml-1 text-xl font-semibold">/MESE</span>
        </p>
        <p className="mt-6 text-white text-solitud">{subscription.description}</p>
        
        <ul role="list" className="pt-6 mt-6 space-y-6 border-t">
          <span className="text-lg font-semibold text-white">Cosa include?</span>
          {subscription.benefits.map(benefit => {
            return (
              <li className="flex" key={benefit}>
                <div className="inline-flex items-center min-w-6 h-6 bg-white rounded-full">
                  <svg className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="ml-3 text-white">{benefit}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mt-6 rounded-lg">
        <Link to="/registrazione">
          <button 
            href="/pricing" 
            type="highlight" 
            className="w-full items-center block px-10 py-3.5 text-base font-bold text-center transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-white"
          >
            ISCRIVITI 
          </button>
        </Link>
      </div>
    </motion.div >
  )
}

export default SubscriptionBlack