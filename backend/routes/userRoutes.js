import express from "express";
import User  from "../models/User.js";
import cloudinaryUploader from "../config/claudinaryConfig.js"; // Import dell'uploader di Cloudinary (CON CLOUDINARY)

const router = express.Router()

// GET /users: RITORNA LA LISTA DEGLI UTENTI
router.get("/", async (req, res) => {
  try {
    // SI RECUPERANO TUTTI GLI UTENTI DAL DATABASE
    const users = await User.find();
    // SI INVIANO LA LISTA DEGLI UTENTI COME RISPOSTA JSON
    res.json(users);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// GET /users/userId: RITORNA IL SINGOLO UTENTE
router.get("/:id", async (req, res) => {
  try {
    // SI CERCA UN UTENTE SPECIFICO PER ID
    const user = await User.findById(req.params.id);
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // SI INVIA L'UTENTE TROVATO COME RISPOSTA JSON
    res.json(user);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// POST /users: CREA UN NUOVO UTENTE
router.post("/", async (req, res) => {
  // SI CREA UNA NUOVA ISTANZA DI USER CON I DATI DALLA RICHIESTA
  const user = new User(req.body);
  try {
    // SI SALVA IL NUOVO UTENTE NEL DATABASE
    const newUserr = await user.save();
    // SI INVIA IL NUOVO UTENTE CREATO COME RISPOSTA JSON CON STATUS 201 (CREATED)
    res.status(201).json(newUserr);
  } catch (err) {
    // IN CASO DI ERRORE (ES. VALIDAZIONE FALLITA),SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/123: MODIFICA L'UTENTE CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    // SI TROVA E SI AGGIORNA L'UTENTE NEL DATABASE
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "User non trovato" });
    }
    // SI INVIA L'UTENTE AGGIORNATO COME RISPOSTA JSON
    res.json(updatedUser);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/123: CANCELLA L'UTENTE CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    // SI TROVA E SI ELIMINA L'UTENTE DAL DATABASE
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Utente eliminato" });
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// PATCH /users/:id/avatar: CARICA UN'IMMAGINE AVATAR PER L'UTENTE SPECIFICATO
router.patch("/:id/avatar", cloudinaryUploader.single("avatar"), async (req, res) => {
  try {
    // SI VERIFICA SE È STATO CARICATO UN FILE, SE NON É STATO CARICATO, SI RISPONDE CON UN 400
    if (!req.file) {
      return res.status(400).json({ message: "Nessun file caricato" });
    }

    // SI CERCA L'UTENTE NEL DATABASE, SE NON ESISTE SI RISPONDE CON UN 404
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // SI AGGIORNA L'URL DELL'AVATAR DELL'UTENTE CON L'URL FORNITO DA CLOUDINARY
    user.avatar = req.file.path;

    // SI SALVANO LE MODIFICHE NEL DB
    await user.save();

    // SI INVIA LA RISPOSTA CON L'UTENTE AGGIORNATO
    res.json(user);
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'avatar:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// GET /:id/messages => RITORNA TUTTI I MESSAGGI DI UNO SPECIFICO UTENTE
router.get("/:id/messages", async (req, res) => {
  try {
    // SI CERCA L'UTENTE NEL DATABASE USANDO L'ID FORNITO
    const user = await User.findById(req.params.id);
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // SI INVIANO I MESSAGGI DELL'UTENTE COME RISPOSTA JSON
    res.json(user.chat);
  } catch (error) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: error.message });
  }
});

//  POST /:id/messages => AGGIUNGI UN NUOVO MESSAGGIO AD UN UTENTE SPECIFICO
router.post("/:id/messages", async (req, res) => {
  try {
    // SI CERCA L'UTENTE NEL DATABASE USANDO L'ID FORNITO
    const user = await User.findById(req.params.id);
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // SI CREA UN NUOVO OGGETTO COMMENTO CON I DATI FORNITI
    const newMessage = {
      name: req.body.name,
      email: req.body.email,
      content: req.body.content,
    };
    // SI AGGIUNGE IL NUOVO COMMENTO ALL'ARRAY DEI COMMENTI DEL POST
    user.chat.push(newMessage);
    // SI SALVA LE MODIFICHE NEL DATABASE
    await user.save();
    // SI INVIA IL NUOVO COMMENTO COME RISPOSTA JSON CON STATUS 201 (CREATED)
    res.status(201).json(newMessage);
  } catch (error) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: error.message });
  }
});

//  POST /:id/messagespdf => AGGIUNGI UN NUOVO MESSAGGIO CON UN PDF AD UN UTENTE SPECIFICO
router.post("/:id/messages/pdf", cloudinaryUploader.single("content"), async (req, res) => {
  try {
    // SI CERCA L'UTENTE NEL DATABASE USANDO L'ID FORNITO
    const user = await User.findById(req.params.id);
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }

    const postData = req.body;
    if (req.file) {
      postData.content = req.file.path; // Cloudinary restituirà direttamente il suo url
    }

    // SI CREA UN NUOVO OGGETTO COMMENTO CON I DATI FORNITI
    const newMessage = {
      name: postData.name,
      email: postData.email,
      content: postData.content,
    };
    
    // SI AGGIUNGE IL NUOVO COMMENTO ALL'ARRAY DEI COMMENTI DEL POST
    user.chat.push(newMessage);
    // SI SALVA LE MODIFICHE NEL DATABASE

    await user.save();
    // SI INVIA IL NUOVO COMMENTO COME RISPOSTA JSON CON STATUS 201 (CREATED)
    res.status(201).json(newMessage);
  } catch (error) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: error.message });
  }
});

// PUT /:id/messages/:messageId => CAMBIA UN MESSAGGIO SPECIFICO DI UN UTENTE SPECIFICO
router.put("/:id/messages/:messageId", async (req, res) => {
  try {
    // SI CERCA L'UTENTE NEL DATABASE USANDO L'ID FORNITO
    const user = await User.findById(req.params.id);
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // SI CERCA IL MESSAGGIO SPECIFICO ALL'INTERNO DELL'ARRAY DELL'UTENTE
    const message = user.chat.id(req.params.messageId);
    if (!message) {
      // SE IL MESSAGGIO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Messaggio non trovato" });
    }
    // SI AGGIORNA IL CONTENUTO DEL MESSAGGIO
    message.content = req.body.content;
    // SI SALVANO LE MODIFICHE NEL DATABASE
    await user.save();
    // SI INVIA IL MESSAGGIO AGGIORNATO COME RISPOSTA JSON
    res.json(message);
  } catch (error) {
    // IN CASO DI ERRORE, INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: error.message });
  }
});

// DELETE /:id/messages/:messageId => ELIMINA UN MESSAGGIO SPECIFICO DI UN UTENTE SPECIFICO
router.delete("/:id/messages/:messageId", async (req, res) => {
  try {
    // SI CERCA L'UTENTE NEL DATABASE USANDO L'ID FORNITO
    const user = await User.findById(req.params.id);
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // SI CERCA IL MESSAGGIO SPECIFICO ALL'INTERNO DELL'ARRAY DELL'UTENTE
    const message = user.chat.id(req.params.messageId);
    if (!message) {
      // SE IL MESSAGGIO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Messaggio non trovato" });
    }
    // RIMUOVI IL MESSAGGIO 
    message.remove();
    // SI SALVANO LE MODIFICHE NEL DATABASE
    await user.save();
    // INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Messaggio eliminato con successo" });
  } catch (error) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: error.message });
  }
});

export default router;
