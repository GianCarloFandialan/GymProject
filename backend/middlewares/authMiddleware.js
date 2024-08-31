import { verifyJWT } from "../utils/jwt.js";
import User from "../models/User.js";

//MIDDLEWARE DI AUTENTICAZIONE
export const authMiddleware = async (req, res, next) => {
  try {
    //ESTRAI IL TOKEN DALL'HEADER AUTHORIZATION
    const token = req.headers.authorization?.replace("Bearer ", "");

    //SE NON C'È UN TOKEN, RESTITUISCE UN ERRORE 401 (UNAUTHORIZED)
    if (!token) {
      return res.status(401).send("Token mancante");
    }

    //VERIFICA E DECODIFICA IL TOKEN USANDO LA FUNZIONE VERIFYJWT
    const decoded = await verifyJWT(token);

    //SI USA L'ID DELL'UTENTE DAL TOKEN PER TROVARE L'UTENTE NEL DATABASE
    const user = await User.findById(decoded.id).select("-password");

    //SE L'UTENTE NON VIENE TROVATO NEL DATABASE, RESTITUISCE UN ERRORE 401
    if (!user) {
      return res.status(401).send("Utente non trovato");
    }

    //SI L'OGGETTO USER ALLA RICHIESTA
    req.user = user;

    //SI PASSA AL PROSSIMO MIDDLEWARE O ALLA ROUTE HANDLER
    next();
  } catch (error) {
    //SE C'È UN ERRORE DURANTE LA VERIFICA DEL TOKEN O NEL TROVARE L'AUTORE, SI RESTITUISCE UN ERRORE 401
    res.status(401).send("Token non valido");
  }
};
