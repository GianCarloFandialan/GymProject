import { motion } from "framer-motion";

function ContactDetails({ contact }) {
  //SI IMPOSTANO LE VARIABILI PER LE ANIMAZIONI DEGLI ELEMENTI DELLA LISTA
  const linkItemVariants = {
    hidden: { opacity: 0, y: "50%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", //Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      y: "50%",
      transition: {
        duration: 0.1,
        ease: "easeOut", //Add ease-out easing function
      },
    },
  };

  return (
    <motion.details
      //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
      variants={linkItemVariants}
      className="group border-s-4 border-black bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden w-[75vw] lg:w-[90vw] mx-auto my-4"
      close="true"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 className="text-lg font-medium text-gray-900">
          {contact.question}
        </h2>

        <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p className="mt-4 leading-relaxed text-gray-700">{contact.answer}</p>
    </motion.details>
  );
}

export default ContactDetails;
