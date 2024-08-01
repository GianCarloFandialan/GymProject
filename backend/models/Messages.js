import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "messages"
  },
);

// CREA ED ESPORTA IL MODELLO 'MESSAGES' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("Message", messageSchema);