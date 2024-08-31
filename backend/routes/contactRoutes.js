import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

//GET /contacts: RITORNA UNA LISTA DEI CONTATTI
router.get("/", async (req, res) => {
  try {
    //SI RECUPERANO TUTTI I CONTATTI DAL DATABASE
    const contacts = await Contact.find();
    //SI INVIA LA LISTA DEI CONTATTI COME RISPOSTA JSON
    res.json(contacts);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//GET /contacts/classId: RITORNA IL SINGOLO CONTATTO
router.get("/:id", async (req, res) => {
  try {
    //SI CERCA IL CONTATTO SPECIFICA PER ID
    const singleContact = await Contact.findById(req.params.id);
    if (!singleContact) {
      //SE IL CONTATTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Contatto non trovato" });
    }
    //SI INVIA IL CONTATTO TROVATO COME RISPOSTA JSON
    res.json(singleContact);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//POST /contacts: CREA UN NUOVO CONTATTO
router.post("/", async (req, res) => {
  //SI CREA UNA NUOVA ISTANZA DI SUBSCRIPTION CON I DATI DALLA RICHIESTA
  const contact = new Contact(req.body);
  try {
    //SI SALVA IL NUOVO CONTATTO NEL DATABASE
    const newContact = await contact.save();
    //SI INVIA IL NUOVO CONTATTO CREATO COME RISPOSTA JSON CON STATUS 201 (CREATED)
    res.status(201).json(newContact);
  } catch (err) {
    //IN CASO DI ERRORE (ES. VALIDAZIONE FALLITA),SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

//PUT /contacts/classId: MODIFICA IL CONTATTO CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    //SI TROVA E SI AGGIORNA IL CONTATTO NEL DATABASE
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //OPZIONE PER RESTITUIRE IL DOCUMENTO AGGIORNATO
    );
    if (!updatedContact) {
      //SE IL CONTATTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Contatto non trovato" });
    }
    //SI INVIA IL CONTATTO AGGIORNATA COME RISPOSTA JSON
    res.json(updatedContact);
  } catch (err) {
    //IN CASO DI ERRORE, INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

//DELETE /contacts/classId: CANCELLA IL CONTATTO CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    //SI TROVA E SI ELIMINA IL CONTATTO DAL DATABASE
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      //SE IL CONTATTO NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Contatto non trovato" });
    }
    //SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Contatto eliminato" });
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

export default router;
