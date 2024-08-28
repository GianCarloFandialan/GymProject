import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    dataDiNascita: { type: String },
    avatar: { type: String },
    password: { type: String },
    trainerId: { type: Array, default: [] },
    isTrainer: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    Subscription: {
      id: { type: String },
      start: { type: Date },
      method: {
        type: { type: String },
        cardNumber: { type: String },
      },
    },
    googleId: { type: String },
    spcialization: { type: Array, default: [] },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// METODO PER CONFRONTARE LE PASSWORD
userSchema.methods.comparePassword = function (candidatePassword) {
  // SI USA BCRYPT PER CONFRONTARE LA PASSWORD FORNITA CON QUELLA HASHATA NEL DATABASE
  return bcrypt.compare(candidatePassword, this.password);
};

// MIDDLEWARE PER L'HASHING DELLE PASSWORD PRIMA DEL SALVATAGGIO
userSchema.pre("save", async function (next) {
  // SI ESEGUE L'HASHING SOLO SE LA PASSWORD È STATA MODIFICATA (O È NUOVA)
  // QUESTO PREVIENE L'HASHING MULTIPLO DELLA STESSA PASSWORD
  if (!this.isModified("password")) return next();

  try {
    // SI GENERA UN SALT
    const salt = await bcrypt.genSalt(10);
    // CREA L'HASH DELLA PASSWORD USANDO IL SALT
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // PASSA EVENTUALI ERRORI AL MIDDLEWARE SUCCESSIVO
  }
});

// CREA ED ESPORTA IL MODELLO 'USERS' BASATO SULLO SCHEMA DEFINITO
export default mongoose.model("User", userSchema);
