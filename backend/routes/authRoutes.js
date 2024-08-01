import express from 'express';
import User from '../models/User.js';
import { generateJWT } from '../utils/jwt.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import passport from '../config/passportConfig.js'; 

const router = express.Router();

// SI DEFINISCE L'URL DEL FRONTEND USANDO UNA VARIABILE D'AMBIENTE
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';


// POST /login => RESTITUISCE TOKEN DI ACCESSO
router.post('/login', async (req, res) => {
  try {
    // ESTRAE EMAIL E PASSWORD DAL CORPO DELLA RICHIESTA
    const { email, password } = req.body;

    // CERCA L'UTENTE NEL DATABASE USANDO L'EMAIL
    const user = await User.findOne({ email });
    if (!user) {
      // SE L'UTENTE NON VIENE TROVATO, SI RESTITUISCE UN ERRORE 401
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    // VERIFICA LA PASSWORD USANDO IL METODO COMPAREPASSWORD DEFINITO NEL MODELLO USER
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // SE LA PASSWORD NON CORRISPONDE, SI RESTITUISCE UN ERRORE 401
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    // SE LE CREDENZIALI SONO CORRETTE, GENERA UN TOKEN JWT
    const token = await generateJWT({ id: user._id });

    // RESTITUISCE IL TOKEN E UN MESSAGGIO DI SUCCESSO
    res.json({ token, message: "Login effettuato con successo" });
  } catch (error) {
    // GESTISCE EVENTUALI ERRORI DEL SERVER
    console.error('Errore nel login:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

// GET /me => RESTITUISCE L'UTENTE COLLEGATO AL TOKEN DI ACCESSO
router.get('/me', authMiddleware, (req, res) => {
  // SI CONVERTE IL DOCUMENTO MONGOOSE IN UN OGGETTO JAVASCRIPT SEMPLICE
  const userData = req.user.toObject();
  // SI RIMUOVE IL CAMPO PASSWORD PER SICUREZZA
  delete userData.password;
  // INVIA I DATI DELL'UTENTE COME RISPOSTA
  res.json(userData);
});


// ROTTA PER INIZIARE IL PROCESSO DI AUTENTICAZIONE GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// ROTTA DI CALLBACK PER L'AUTENTICAZIONE GOOGLE
router.get('/google/callback', 

  passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` }),
  // SE L'AUTENTICAZIONE FALLISCE, L'UTENTE VIENE REINDIRIZZATO ALLA PAGINA DI LOGIN
  
  async (req, res) => {
    try {
      // SI GENERA UN JWT (JSON WEB TOKEN) PER L'UTENTE AUTENTICATO
      const token = await generateJWT({ id: req.user._id });

      // SI REINDIRIZZA L'UTENTE AL FRONTEND, PASSANDO IL TOKEN COME PARAMETRO URL
      res.redirect(`${FRONTEND_URL}/login?token=${token}`);
    } catch (error) {
      // SE C'È UN ERRORE NELLA GENERAZIONE DEL TOKEN, LO LOGGHIAMO
      console.error('Errore nella generazione del token:', error);
      // REINDIRIZZIAMO L'UTENTE ALLA PAGINA DI LOGIN CON UN MESSAGGIO DI ERRORE
      res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);


// FUNZIONE HELPER PER GESTIRE IL CALLBACK DI AUTENTICAZIONE
async function handleAuthCallback(req, res) {
  try {
    // SI GENERA UN JWT (JSON WEB TOKEN) PER L'UTENTE AUTENTICATO
    const token = await generateJWT({ id: req.user._id });

    // SI REINDIRIZZA L'UTENTE AL FRONTEND, PASSANDO IL TOKEN COME PARAMETRO URL
    res.redirect(`${FRONTEND_URL}/login?token=${token}`);
  } catch (error) {
    // SE C'È UN ERRORE NELLA GENERAZIONE DEL TOKEN, LO SI MOSTRA IN CONSOLE
    console.error('Errore nella generazione del token:', error);
    // REINDIRIZZIAMO L'UTENTE ALLA PAGINA DI LOGIN CON UN MESSAGGIO DI ERRORE
    res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
  }
}

export default router;