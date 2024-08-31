import { AnimatePresence, motion } from "framer-motion";
import CardButton from "../../subscriptions/newsubscriptionmodal_components/CardButton";
import RegisterPaypalButton from "./registersubscriptionmodal_components/RegisterPaypalButton";
import RegisterAppleButton from "./registersubscriptionmodal_components/RegisterAppleButton";
import RSMForm from "./registersubscriptionmodal_components/RSMForm";

function RegisterSubscriptionModal({
  setOpenModal,
  setSelectedSubscription,
  newUser,
  setNewUser,
}) {
  return (
    <AnimatePresence>
      <motion.div
        //VALORI UTILI PER L'ANIMAZIONE DEL COMPONENTE
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        //AL CLICK SI CHIUDE IL MODALE E SI IMPOSTA L'ABBONAMENTO SELEZIONA A NULLO
        onClick={() => {
          setOpenModal(false);
          setSelectedSubscription("");
        }}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center [&amp;>div]:w-full bg-black rounded-xl"
        >
          <div className="rounded-xl border bg-card text-card-foreground shadow lg:w-[30vw]">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight text-white">
                Metodo di pagamento
              </h3>
              <p className="text-sm text-muted-foreground text-white">
                Aggiungi un metodo di pagamento.
              </p>
            </div>
            <div className="p-6 pt-0 grid gap-6">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ outline: "none" }}
              >
                {/* BOTTONE PER L'OPZIONE CARTA COME METODO DI PAGAMENTO */}
                <CardButton />
                {/* BOTTONE PER L'OPZIONE PAYPAL COME METODO DI PAGAMENTO */}
                {/* SI PASSANO COME PARAMETRI: LA FUNZIONE PER GESTIRE LO STATO CHE AIUTA A GESTIRE IL MODALE PER CAMBIARE IL METODO DI PAGAMENTO, LO STATO PER GESTIRE IL NUOVO UTENTE E LA RELATIVA FUNZIONE  */}
                <RegisterPaypalButton
                  setOpenModal={setOpenModal}
                  newUser={newUser}
                  setNewUser={setNewUser}
                />
                {/* BOTTONE PER L'OPZIONE APPLE PAY COME METODO DI PAGAMENTO */}
                {/* SI PASSANO COME PARAMETRI: LA FUNZIONE PER GESTIRE LO STATO CHE AIUTA A GESTIRE IL MODALE PER CAMBIARE IL METODO DI PAGAMENTO, LO STATO PER GESTIRE IL NUOVO UTENTE E LA RELATIVA FUNZIONE */}
                <RegisterAppleButton
                  setOpenModal={setOpenModal}
                  newUser={newUser}
                  setNewUser={setNewUser}
                />
              </div>
            </div>
            {/* FORM PER INSERIRE I DATI DELLA CARTA */}
            {/* SI PASSANO COME PARAMETRI: LA FUNZIONE PER GESTIRE LO STATO CHE AIUTA A GESTIRE IL MODALE PER CAMBIARE IL METODO DI PAGAMENTO, LO STATO PER GESTIRE IL NUOVO UTENTE E LA RELATIVA FUNZIONE */}
            <RSMForm
              setOpenModal={setOpenModal}
              newUser={newUser}
              setNewUser={setNewUser}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RegisterSubscriptionModal;
