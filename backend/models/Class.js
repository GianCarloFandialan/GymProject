import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    hour: { type: String, required: true },
    day: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "classes"
  },
);

// CREA ED ESPORTA IL MODELLO 'CLASSES' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("Classes", classSchema);