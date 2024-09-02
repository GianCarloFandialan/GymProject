import { motion } from "framer-motion";

function RegisterSubBlack({
  subscription,
  setSelectedSubscription,
  selectedSubscription,
  setOpenModal,
}) {
  //VARIANTI PER LE ANIMAZIONI DELLA CARD UNA VOLTA SELEZIONATO L'ABBONAMENTO
  const cardVariants = {
    open: {
      scale: 1.2,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      animate={selectedSubscription == subscription._id ? "open" : "closed"}
    >
      <motion.div
        variants={cardVariants}
        className={
          selectedSubscription == subscription._id
            ? "bg-black rounded-xl shadow-2xl border-gray-800 border-2 z-30 max-w-[75vw] md:max-w-screen-md mx-auto"
            : "bg-white rounded-xl shadow-2xl md:min-h-[304px] max-w-[75vw] mx-auto"
        }
      >
        <div className="p-6 text-center">
          <h2
            className={
              selectedSubscription == subscription._id
                ? "text-lg font-bold leading-6 text-white"
                : "text-lg font-bold leading-6 text-neutral-600"
            }
          >
            {subscription.name}
          </h2>

          <p className="mt-8 text-4xl">
            <span
              className={
                selectedSubscription == subscription._id
                  ? "font-black text-white uppercase"
                  : "font-black text-gray-500 uppercase"
              }
            >
              €{subscription.price}
            </span>
            <span
              className={
                selectedSubscription == subscription._id
                  ? "font-medium text-white"
                  : "font-medium text-gray-500"
              }
            >
              /mese
            </span>
          </p>
          <span
            className={
              selectedSubscription == subscription._id
                ? "text-xs text-white"
                : "text-xs text-neutral-600"
            }
          >
            {subscription.description}
          </span>
          <div className="mt-6">
            {/* AL CLICK MODIFICA LO STATO DELL'ABBOANEMNTO SELEZIONATO ED IPMPOSTA QUELLO DI QUESTA CARD E APRE IL MODALE PER IL METODO DI PAGAMENTO */}
            <button
              className={
                selectedSubscription == subscription._id
                  ? "w-full items-center block px-10 py-3.5 text-base font-medium text-center text-white transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  : "flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-black rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-800"
              }
              onClick={(e) => {
                e.preventDefault();
                setSelectedSubscription(subscription._id);
                setOpenModal(true);
              }}
            >
              SELEZIONA
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RegisterSubBlack;
