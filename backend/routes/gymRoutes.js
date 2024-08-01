import express from "express";
import Gym from "../models/Gym.js";
import cloudinaryUploader from "../config/claudinaryConfig.js"; // Import dell'uploader di Cloudinary (CON CLOUDINARY)

const router = express.Router();

// GET /gyms: RITORNA UNA LISTA DELLE PALESTRE
router.get("/", async (req, res) => {
  try {
    // SI RECUPERANO TUTTI LE PALESTRE DAL DATABASE
    const gyms = await Gym.find();
    // SI INVIA LA LISTA DELLE PALESTRE COME RISPOSTA JSON
    res.json(gyms);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// GET /gyms/gymId: RITORNA LA SINGOLA PALESTRA
router.get("/:id", async (req, res) => {
  try {
    // SI CERCA LA PALESTRA SPECIFICA PER ID
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      // SE LA PALESTRA NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Palestra non trovata" });
    }
    // SI INVIA LA PALESTRA TROVATA COME RISPOSTA JSON
    res.json(gym);
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

// POST /gyms: CREA UNA NUOVA PALESTRA
router.post("/", cloudinaryUploader.single("cover"), async (req, res) => {
  try {
    const gymData = req.body;
    if (req.file) {
      gymData.cover = req.file.path; // CLOUDINARY RESTITUIRÀ DIRETTAMENTE IL SUO URL
    }
    const newGym = new Gym(gymData);
    await newGym.save();

    res.status(201).json(newGym);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// PUT /gyms/gymId: MODIFICA LA PALESTRA CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    // SI TROVA E SI AGGIORNA LA PALESTRA NEL DATABASE
    const updatedGym = await Gym.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // OPZIONE PER RESTITUIRE IL DOCUMENTO AGGIORNATO
    );
    if (!updatedGym) {
      // SE LA PALESTRA NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Palestra non trovata" });
    }
    // SI INVIA LA PALESTRA AGGIORNATA COME RISPOSTA JSON
    res.json(updatedGym);
  } catch (err) {
    // IN CASO DI ERRORE, INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

// PATCH /gyms/gymId/cover: CARICA UN'IMMAGINE COVER PER LA PALESTRA SPECIFICATO
router.patch("/:id/cover", cloudinaryUploader.single("cover"), async (req, res) => {
  try {
    // SI VERIFICA SE È STATO CARICATO UN FILE, SE NON É STATO CARICATO, SI RISPONDE CON UN 400
    if (!req.file) {
      return res.status(400).json({ message: "Nessun file caricato" });
    }

    // SI CERCA LA PALESTRA SPECIFICA PER ID
    const gym = await Gym.findById(req.params.id);
    if (!gym) {
      // SE LA PALESTRA NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Palestra non trovata" });
    }

    // SI AGGIORNA L'URL DELLA COVER DELLA PALESTRA CON L'URL FORNITO DA CLOUDINARY
    gym.cover = req.file.path;

    // SI SALVANO LE MODIFICHE NEL DB
    await gym.save();

    // SI INVIA LA RISPOSTA CON LA PALESTRA AGGIORNATA
    res.json(gym);
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'avatar:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// DELETE /gyms/gymId: CANCELLA IL PALESTRA CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    // SI TROVA E SI ELIMINA LA PALESTRA DAL DATABASE
    const deletedGym = await Gym.findByIdAndDelete(req.params.id);
    if (!deletedGym) {
      // SE LA PALESTRA NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Palestra non trovata" });
    }
    // SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Palestra eliminata" });
  } catch (err) {
    // IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

export default router;