import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    tel: { type: String, required: true },
    hours: { type: String, required: true },
    cover: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "gyms",
  }
);

//CREA ED ESPORTA IL MODELLO 'GYMS' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("Gym", gymSchema);
