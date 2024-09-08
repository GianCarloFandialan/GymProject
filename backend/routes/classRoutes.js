import express from "express";
import Class from "../models/Class.js";
import cloudinaryUploader from "../config/claudinaryConfig.js"; //Import dell'uploader di Cloudinary (CON CLOUDINARY)

const router = express.Router();

//GET /classes: RITORNA UNA LISTA DELLE CLASSI
router.get("/", async (req, res) => {
  try {
    //SI RECUPERANO TUTTI LE CLASSI DAL DATABASE
    const classes = await Class.find();
    //SI INVIA LA LISTA DELLE CLASSI COME RISPOSTA JSON
    res.json(classes);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//GET /classes/classId: RITORNA LA SINGOLA CLASSE
router.get("/:id", async (req, res) => {
  try {
    //SI CERCA LA CLASSE SPECIFICA PER ID
    const singleClass = await Class.findById(req.params.id);
    if (!singleClass) {
      //SE LA CLASSE NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Classe non trovata" });
    }
    //SI INVIA LA CLASSE TROVATA COME RISPOSTA JSON
    res.json(singleClass);
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

//POST /classes: CREA UNA NUOVA CLASSE
router.post("/", cloudinaryUploader.single("cover"), async (req, res) => {
  try {
    const singleClassData = req.body;
    if (req.file) {
      singleClassData.cover = req.file.path; //CLOUDINARY RESTITUIRÀ DIRETTAMENTE IL SUO URL
    }
    const newClass = new Class(singleClassData);
    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

//PUT /classes/classId: MODIFICA LA CLASSE CON L'ID ASSOCIATO
router.put("/:id", async (req, res) => {
  try {
    //SI TROVA E SI AGGIORNA LA CLASSE NEL DATABASE
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //OPZIONE PER RESTITUIRE IL DOCUMENTO AGGIORNATO
    );
    if (!updatedClass) {
      //SE LA CLASSE NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Classe non trovata" });
    }
    //SI INVIA LA CLASSE AGGIORNATA COME RISPOSTA JSON
    res.json(updatedClass);
  } catch (err) {
    //IN CASO DI ERRORE, INVIA UNA RISPOSTA DI ERRORE
    res.status(400).json({ message: err.message });
  }
});

//PATCH /classes/classId/cover: CARICA UN'IMMAGINE COVER PER LA CLASSE SPECIFICATO
router.patch(
  "/:id/cover",
  cloudinaryUploader.single("cover"),
  async (req, res) => {
    try {
      //SI VERIFICA SE È STATO CARICATO UN FILE, SE NON É STATO CARICATO, SI RISPONDE CON UN 400
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      }

      //SI CERCA LA CLASSE SPECIFICA PER ID
      const singleClass = await Class.findById(req.params.id);
      if (!singleClass) {
        //SE LA CLASSE NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
        return res.status(404).json({ message: "Classe non trovato" });
      }

      //AGGIORNA I DATI DELLA CLASSE CON I VALORI FORNITI NEL BODY
      Object.assign(singleClass, req.body);

      //SI AGGIORNA L'URL DELLA COVER DELLA CLASSE CON L'URL FORNITO DA CLOUDINARY
      singleClass.cover = req.file.path;

      //SI SALVANO LE MODIFICHE NEL DB
      await singleClass.save();

      //SI INVIA LA RISPOSTA CON LA CLASSE AGGIORNATA
      res.json(singleClass);
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'avatar:", error);
      res.status(500).json({ message: "Errore interno del server" });
    }
  }
);

//DELETE /classes/classId: CANCELLA IL CLASSE CON L'ID ASSOCIATO
router.delete("/:id", async (req, res) => {
  try {
    //SI TROVA E SI ELIMINA LA CLASSE DAL DATABASE
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      //SE LA CLASSE NON VIENE TROVATA, SI INVIA UNA RISPOSTA 404
      return res.status(404).json({ message: "Classe non trovata" });
    }
    //SI INVIA UN MESSAGGIO DI CONFERMA COME RISPOSTA JSON
    res.json({ message: "Classe eliminata" });
  } catch (err) {
    //IN CASO DI ERRORE, SI INVIA UNA RISPOSTA DI ERRORE
    res.status(500).json({ message: err.message });
  }
});

export default router;
