import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    benefits: { type: Array, required: true },
  },
  {
    timestamps: true,
    collection: "subscriptions",
  }
);

//CREA ED ESPORTA IL MODELLO 'SUBSCRIPTIONS' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("Subscription", subscriptionSchema);
