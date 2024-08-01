import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "contents"
  },
);

// CREA ED ESPORTA IL MODELLO 'CONTENTS' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("Content", contentSchema);