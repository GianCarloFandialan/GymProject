import express from "express";
import Subscription  from "../models/Subscription.js";

const router = express.Router()

// GET /subscriptions: RITORNA LA LISTA DEGLI ABBONAMENTI
router.get("/", async (req, res) => {
  try {
    // SI RECUPERANO TUTTI GLI ABBONAMENTI DAL DATABASE
    const subscriptions = await Subscription.find();
    // SI INVIANO LA LISTA DEGLI ABBONAMENTI COME RISPOSTA JSON
    res.json(subscriptions);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// GET /subscriptions/subscriptionId: RITORNA IL SINGOLO ABBONAMENTO
router.get("/:id", async (req, res) => {
  try {
    // SI CERCA UN ABBONAMENTO SPECIFICO PER ID
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      // SE L'ABBONAMENTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Abbonamento non trovato" });
    }
    // SI INVIA L'ABBONAMENTO TROVATO COME RISPOSTA JSON
    res.json(subscription);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// POST /subscriptions: CREA UN NUOVO ABBONAMENTO
router.post("/", async (req, res) => {
  // SI CREA UNA NUOVA ISTANZA DI SUBSCRIPTION CON I DATI DALLA RICHIESTA
  const subscription = new Subscription(req.body);
  try {
    // SI SALVA IL NUOVO ABBONAMENTO NEL DATABASE
    const newSubscriptionr = await subscription.save();
    // SI INVIA IL NUOVO ABBONAMENTO CREATO COME RISPOSTA JSON CON STATUS 201 (CREATED)
    res.status(201).json(newSubscriptionr);
  } catch (err) {
    // IN CASO DI ERRORE (ES. VALIDAZIONE FALLITA),SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

// PUT /subscriptions/123: MODIFICA L'ABBONAMENTO CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    // SI TROVA E SI AGGIORNA L'ABBONAMENTO NEL DATABASE
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubscription) {
      // SE L'ABBONAMENTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Abbonamento non trovato" });
    }
    // SI INVIA L'ABBONAMENTO AGGIORNATO COME RISPOSTA JSON
    res.json(updatedSubscription);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

// DELETE /subscriptions/123: CANCELLA L'ABBONAMENTO CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    // SI TROVA E SI ELIMINA L'ABBONAMENTO DAL DATABASE
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) {
      // SE L'ABBONAMENTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Abbonamento non trovato" });
    }
    // SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Abbonamento eliminato" });
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});


export default router;
