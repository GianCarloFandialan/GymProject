import { AnimatePresence, motion } from "framer-motion";
import CardButton from "./newsubscriptionmodal_components/CardButton";
import PaypalButton from "./newsubscriptionmodal_components/PaypalButton";
import AppleButton from "./newsubscriptionmodal_components/AppleButton";
import NSMForm from "./newsubscriptionmodal_components/NSMForm";

function NewSubscriptionModal() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // onClick={() => setSuccess(false)}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center [&amp;>div]:w-full bg-black rounded-xl"
        >
          <div className="rounded-xl border bg-card text-card-foreground shadow">
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
                <CardButton />
                <PaypalButton />
                <AppleButton />
              </div>
            </div>
            <NSMForm />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NewSubscriptionModal;
