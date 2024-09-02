import express from "express"; //Framework web per Node.js
import mongoose from "mongoose"; //ODM per MongoDB
import dotenv from "dotenv"; //Per caricare variabili d'ambiente da file .env
import cors from "cors"; //Middleware per gestire CORS (Cross-Origin Resource Sharing)
import listEndpoints from "express-list-endpoints"; //Utility per elencare gli endpoints dell'app
import userRoutes from "./routes/userRoutes.js"; //Rotte per gli utenti
import messagesRoutes from "./routes/messagesRoutes.js"; //Rotte per gli utenti
import contentRoutes from "./routes/contentRoutes.js"; //Rotte per i conenuti
import gymRoutes from "./routes/gymRoutes.js"; //Rotte per le palestre
import classRoutes from "./routes/classRoutes.js"; //Rotte per le classi
import subscriptionRoutes from "./routes/subscriptionRoutes.js"; //Rotte per gli abbonamenti
import authRoutes from "./routes/authRoutes.js"; //Rotte per l'autenticazione
import contactRoutes from "./routes/contactRoutes.js"; //Rotte per i contatti
import session from "express-session"; //Importiamo session
import passport from "./config/passportConfig.js"; //importiamo passport

//MIDDLEWARE IMPORTAZIONE DEI MIDDLEWARE PER LA GESTIONE DEGLI ERRORI
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./middlewares/errorHandlers.js";

//SI CARICANO LE VARIABILI D'AMBIENTE DAL FILE .ENV
dotenv.config();

//SI CREA DELL'ISTANZA DELL'APPLICAZIONE EXPRESS
const app = express();

//CONFIGURAZIONE CORS
const corsOptions = {
  origin: function (origin, callback) {
    //DEFINIAMO UNA WHITELIST DI ORIGINI CONSENTITE.
    //QUESTE SONO GLI URL DA CUI IL NOSTRO FRONTEND FARÀ RICHIESTE AL BACKEND.
    const whitelist = [
      "http://localhost:5173", //FRONTEND IN SVILUPPO
      "https://mern-blog-part-v.vercel.app/", //FRONTEND IN PRODUZIONE
      "https://mern-blog-ctt3.onrender.com", //URL DEL BACKEND
    ];

    if (process.env.NODE_ENV === "development") {
      //IN SVILUPPO, PERMETTIAMO ANCHE RICHIESTE SENZA ORIGINE (ES. POSTMAN)
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1 || !origin) {
      //IN PRODUZIONE, CONTROLLIAMO SE L'ORIGINE È NELLA WHITELIST
      callback(null, true);
    } else {
      callback(new Error("PERMESSO NEGATO - CORS"));
    }
  },
  credentials: true, //PERMETTE L'INVIO DI CREDENZIALI, COME NEL CASO DI AUTENTICAZIONE
  //BASATA SU SESSIONI.
};

//PASSIAMO `corsOptions` a cors()
app.use(cors(corsOptions));

//APPLICAZIONE DEI MIDDLEWARE GLOBALI
app.use(cors()); //Abilita CORS per tutte le rotte
app.use(express.json()); //PARSING DEL CORPO DELLE RICHIESTE IN FORMATO JSON

//CONFIGURAZIONE DELLA SESSIONE
app.use(
  session({
    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,
  })
);

//INIZIALIZZAZIONE DI PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//CONNESSIONE AL DATABASE MONGODB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000, //Aumenta a 60 secondi
    socketTimeoutMS: 60000, //Aggiungi questo
  })
  .then(() => console.log("MongoDB connesso"))
  .catch((err) => console.error("Errore di connessione MongoDB:", err));

//DEFINIZIONE DELLE ROTTE PRINCIPALI
app.use("/api/auth", authRoutes); //Rotte per l'autenticazione
app.use("/api/users", userRoutes); //Rotte per gli utenti
app.use("/api/contents", contentRoutes); //Rotte per i contenuti
app.use("/api/gyms", gymRoutes); //Rotte per le palestre
app.use("/api/classes", classRoutes); //Rotte per le classi
app.use("/api/subscriptions", subscriptionRoutes); //Rotte per gli abbonamenti
app.use("/api/messages", messagesRoutes); //Rotte per i messaggi
app.use("/api/contacts", contactRoutes); //Rotte per i contatti
//DEFINIZIONE DELLA PORTA SU CUI IL SERVER ASCOLTERÀ
const PORT = process.env.PORT || 5001;

//APPLICAZIONE DEI MIDDLEWARE PER LA GESTIONE DEGLI ERRORI
app.use(badRequestHandler); //GESTISCE ERRORI 400 BAD REQUEST
app.use(unauthorizedHandler); //GESTISCE ERRORI 401 UNAUTHORIZED
app.use(notFoundHandler); //GESTISCE ERRORI 404 NOT FOUND
app.use(genericErrorHandler); //GESTISCE TUTTI GLI ALTRI ERRORI

//AVVIO DEL SERVER
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);

  //STAMPA TUTTE LE ROTTE DISPONIBILI IN FORMATO TABELLARE
  console.log("Rotte disponibili:");
  console.table(
    listEndpoints(app).map((route) => ({
      path: route.path,
      methods: route.methods.join(", "),
    }))
  );
});
