import express from "express";
import Content from "../models/Content.js";
import cloudinaryUploader from "../config/claudinaryConfig.js"; //Import dell'uploader di Cloudinary (CON CLOUDINARY)

const router = express.Router();

//GET /contents: RITORNA UNA LISTA DEI CONTENUTI
router.get("/", async (req, res) => {
  try {
    //SI RECUPERANO TUTTI I CONTENUTI DAL DATABASE
    const contents = await Content.find();
    //SI INVIA LA LISTA DEI CONTENUTI COME RISPOSTA JSON
    res.json(contents);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//GET /contents/contentId: RITORNA IL SINGOLO CONTENUTO
router.get("/:id", async (req, res) => {
  try {
    //SI CERCA IL CONTENUTO SPECIFICO PER ID
    const content = await Content.findById(req.params.id);
    if (!content) {
      //SE IL CONTENUTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Contenuto non trovato" });
    }
    //SI INVIA IL CONTENUTO TROVATO COME RISPOSTA JSON
    res.json(content);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//POST /contents: CREA UN NUOVO CONTENUTO
router.post("/", cloudinaryUploader.single("cover"), async (req, res) => {
  try {
    const contentData = req.body;
    if (req.file) {
      contentData.cover = req.file.path; //CLOUDINARY RESTITUIRÀ DIRETTAMENTE IL SUO URL
    }
    const newContent = new Content(contentData);
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

//PUT /contents/contentId: MODIFICA IL CONTENUTO CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    //SI TROVA E SI AGGIORNA IL CONTENUTO NEL DATABASE
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //OPZIONE PER RESTITUIRE IL DOCUMENTO AGGIORNATO
    );
    if (!updatedContent) {
      //SE IL CONTENUTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Contenuto non trovato" });
    }
    //SI INVIA IL CONTENUTO POST AGGIORNATO COME RISPOSTA JSON
    res.json(updatedContent);
  } catch (err) {
    //IN CASO DI ERRORE, INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

//PATCH /contents/contentId/cover: CARICA UN'IMMAGINE COVER IL CONTENUTO SPECIFICATO
router.patch(
  "/:id/cover",
  cloudinaryUploader.single("cover"),
  async (req, res) => {
    try {
      //SI VERIFICA SE È STATO CARICATO UN FILE, SE NON É STATO CARICATO, SI RISPONDE CON UN 400
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      }

      //SI CERCA IL CONTENUTO SPECIFICO PER ID
      const content = await Content.findById(req.params.id);
      if (!content) {
        //SE IL CONTENUTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
        return res.status(404).json({ message: "Contenuto non trovato" });
      }

      //SI AGGIORNA L'URL DELLA COVER DEL CONTENUTO CON L'URL FORNITO DA CLOUDINARY
      content.cover = req.file.path;

      //SI SALVANO LE MODIFICHE NEL DB
      await content.save();

      //SI INVIA LA RISPOSTA CON IL CONTENUTO AGGIORNATO
      res.json(content);
    } catch (error) {
      console.error("Errore durante l'aggiornamento della cover:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  }
);

//DELETE /contents/contentId: CANCELLA IL CONTENUTO CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    //SI TROVA E SI ELIMINA IL CONTENUTO DAL DATABASE
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      //SE IL CONTENUTO NON VIENE TROVATO, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Contenuto non trovato" });
    }
    //SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Contenuto eliminato" });
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

export default router;
