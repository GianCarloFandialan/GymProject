import express from "express";
import Messages from "../models/Messages.js";
import cloudinaryUploader from "../config/claudinaryConfig.js"; //Import dell'uploader di Cloudinary (CON CLOUDINARY)

const router = express.Router();

//GET /messages: RITORNA LA LISTA DEGLI UTENTI
router.get("/", async (req, res) => {
  try {
    //SI RECUPERANO TUTTI GLI UTENTI DAL DATABASE
    const messages = await Messages.find();
    //SI INVIANO LA LISTA DEGLI UTENTI COME RISPOSTA JSON
    res.json(messages);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//POST /messages: CREA UN NUOVO MESSAGGIO
router.post("/", cloudinaryUploader.single("content"), async (req, res) => {
  try {
    const messageData = req.body;
    if (req.file) {
      messageData.content = req.file.path; //CLOUDINARY RESTITUIRÀ DIRETTAMENTE IL SUO URL
    }
    const newMessage = new Messages(messageData);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

//DELETE /messages/messageId: CANCELLA IL MESSAGGIO CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    //SI TROVA E SI ELIMINA IL MESSAGGIO DAL DATABASE
    const deletedMessage = await Messages.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      //SE IL MESSAGGIO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Messaggio non trovato" });
    }
    //SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Messaggio eliminato" });
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

export default router;
