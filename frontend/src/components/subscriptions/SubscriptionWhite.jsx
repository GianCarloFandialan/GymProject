import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserDataContext, IsLoggedInContext } from "../../services/context";
import { useContext } from "react";
import SWModifyButton from "./SubscriptionWhite_components/SWModifyButton";
import SWRegisterButton from "./SubscriptionWhite_components/SWRegisterButton";
import SWSubscribeButton from "./SubscriptionWhite_components/SWSubscribeButton";
import SWCheck from "./SubscriptionWhite_components/SWCheck";

function SubscriptionWhite({ subscription }) {
  //SI USA IL CONTEXT CHE AIUTA A GESITRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const { userData, setUserData } = useContext(UserDataContext);

  //SI USA IL CONTEXT CHE AIUTA A GESITRE LA PAGINE NEL CASO UN UTENTE ABBIA ESEGUITO L'ACCESSO
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

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
        viewport: {
          amount: "all",
        },
      }}
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="relative flex flex-col p-8 bg-white shadow-2xl rounded-2xl hover:z-30"
    >
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-neutral-600">
          {subscription.name}
        </h3>
        <p className="flex items-baseline mt-4 text-neutral-600">
          <span className="text-5xl font-extrabold tracking-tight">
            €{subscription.price}
          </span>
          <span className="ml-1 text-xl font-semibold">/MESE</span>
        </p>
        <p className="mt-6 text-gray-500">{subscription.description}</p>

        <ul role="list" className="pt-6 mt-6 space-y-6 border-t">
          <span className="text-lg font-semibold text-neutral-600">
            Cosa include?
          </span>
          {subscription.benefits.map((benefit) => {
            return (
              <li className="flex" key={benefit}>
                <SWCheck />
                <span className="ml-3 text-neutral-600">{benefit}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-6 rounded-lg">
        {isLoggedIn ? (
          <>
            {userData.hasOwnProperty("Subscription") ? (
              <SWModifyButton />
            ) : (
              <SWSubscribeButton />
            )}
          </>
        ) : (
          <SWRegisterButton />
        )}
      </div>
    </motion.div>
  );
}

export default SubscriptionWhite;
