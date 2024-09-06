import express from "express";
import User from "../models/User.js";
import cloudinaryUploader from "../config/claudinaryConfig.js"; //Import dell'uploader di Cloudinary (CON CLOUDINARY)

const router = express.Router();

//GET /users: RITORNA LA LISTA DEGLI UTENTI
router.get("/", async (req, res) => {
  try {
    //SI RECUPERANO TUTTI GLI UTENTI DAL DATABASE
    const users = await User.find();
    //SI INVIANO LA LISTA DEGLI UTENTI COME RISPOSTA JSON
    res.json(users);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//GET /users/userId: RITORNA IL SINGOLO UTENTE
router.get("/:id", async (req, res) => {
  try {
    //SI CERCA UN UTENTE SPECIFICO PER ID
    const user = await User.findById(req.params.id);
    if (!user) {
      //SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    //SI INVIA L'UTENTE TROVATO COME RISPOSTA JSON
    res.json(user);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//POST /users: CREA UN NUOVO UTENTE
router.post("/", cloudinaryUploader.single("avatar"), async (req, res) => {
  try {
    const usertData = req.body;
    if (req.file) {
      usertData.avatar = req.file.path; //CLOUDINARY RESTITUIRÀ DIRETTAMENTE IL SUO URL
    }
    const newUser = new User(usertData);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

//PATCH /users/userId/avatar: CARICA UN'IMMAGINE COVER IL CONTENUTO SPECIFICATO
router.patch(
  "/:id/avatar",
  cloudinaryUploader.single("avatar"),
  async (req, res) => {
    try {
      //SI VERIFICA SE È STATO CARICATO UN FILE, SE NON É STATO CARICATO, SI RISPONDE CON UN 400
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      }

      //SI CERCA IL CONTENUTO SPECIFICO PER ID
      const user = await User.findById(req.params.id);
      if (!user) {
        //SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
        return res.status(404).json({ message: "Utente non trovato" });
      }

      // AGGIORNA I DATI DELL'UTENTE CON I VALORI FORNITI NEL BODY
      Object.assign(user, req.body);

      //SI AGGIORNA L'URL DELL'AVATAR DELL'UTENTE CON L'URL FORNITO DA CLOUDINARY
      user.avatar = req.file.path;

      //SI SALVANO LE MODIFICHE NEL DB
      await user.save();

      //SI INVIA LA RISPOSTA CON IL CONTENUTO AGGIORNATO
      res.json(user);
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'avatar:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  }
);

//PUT /users/123: MODIFICA L'UTENTE CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    //SI TROVA E SI AGGIORNA L'UTENTE NEL DATABASE
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      //SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "User non trovato" });
    }
    //SI INVIA L'UTENTE AGGIORNATO COME RISPOSTA JSON
    res.json(updatedUser);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

//DELETE /users/123: CANCELLA L'UTENTE CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    //SI TROVA E SI ELIMINA L'UTENTE DAL DATABASE
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      //SE L'UTENTE NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Utente non trovato" });
    }
    //SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Utente eliminato" });
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//PATCH /users/:id/avatar: CARICA UN'IMMAGINE AVATAR PER L'UTENTE SPECIFICATO
router.patch(
  "/:id/avatar",
  cloudinaryUploader.single("avatar"),
  async (req, res) => {
    try {
      //SI VERIFICA SE È STATO CARICATO UN FILE, SE NON É STATO CARICATO, SI RISPONDE CON UN 400
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      }

      //SI CERCA L'UTENTE NEL DATABASE, SE NON ESISTE SI RISPONDE CON UN 404
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utente non trovato" });
      }

      //SI AGGIORNA L'URL DELL'AVATAR DELL'UTENTE CON L'URL FORNITO DA CLOUDINARY
      user.avatar = req.file.path;

      //SI SALVANO LE MODIFICHE NEL DB
      await user.save();

      //SI INVIA LA RISPOSTA CON L'UTENTE AGGIORNATO
      res.json(user);
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'avatar:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  }
);

export default router;
