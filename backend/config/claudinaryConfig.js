import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config";

// CONFIGURAZIONE DI CLOUDINARY CON LE CREDENZIALI DALL'AMBIENTE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CONFIGURAZIONE DELLO STORAGE CLOUDINARY
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gym_images", // SPECIFICA LA CARTELLA DI DESTINAZIONE SU CLOUDINARY
    allowed_formats: ["jpg", "png", "jpeg", "gif", "pdf"], // LIMITA I FORMATI DI FILE ACCETTATI
  },
});

// CREAZIONE DELL'UPLOADER MULTER CON LO STORAGE CLOUDINARY CONFIGURATO
const cloudinaryUploader = multer({ 
  storage: storage,  
});

// ESPORTAZIONE DELL'UPLOADER PER L'USO IN ALTRE PARTI DELL'APPLICAZIONE
export default cloudinaryUploader;