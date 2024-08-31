import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "contacts",
  }
);

//CREA ED ESPORTA IL MODELLO 'CONTACTS' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("Contacts", contactSchema);
