import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

//CONFIGURIAMO LA STRATEGIA DI AUTENTICAZIONE GOOGLE
passport.use(
  new GoogleStrategy(
    {
      //USIAMO LE VARIABILI D'AMBIENTE PER LE CREDENZIALI OAUTH
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //L'URL A CUI GOOGLE REINDIZZERÀ DOPO L'AUTENTICAZIONE
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    //QUESTA FUNZIONE VIENE CHIAMATA QUANDO L'AUTENTICAZIONE GOOGLE HA SUCCESSO
    async (accessToken, refreshToken, profile, done) => {
      try {
        //CERCHIAMO SE ESISTE GIÀ UN UTENTE CON QUESTO ID GOOGLE
        let user = await User.findOne({ email: profile.emails[0].value });

        console.log("LOG UTENTE", user);

        //SE L'UTENTE NON ESISTE, NE CREIAMO UNO NUOVO
        if (!user) {
          user = new User({
            googleId: profile.id, //ID UNIVOCO FORNITO DA GOOGLE
            nome: profile.name.givenName, //NOME DELL'UTENTE
            cognome: profile.name.familyName, //COGNOME DELL'UTENTE
            email: profile.emails[0].value, //EMAIL PRINCIPALE DELL'UTENTE
            dataDiNascita: null, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A NULL
            avatar: null, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A NULL
            trainerId: null, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A NULL
            chat: [], //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A NULL
            isTrainer: false, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A FALSE
            isAdmin: false, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A FALSE
            trainerId: null, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A FALSE
            SubscriptionId: null, //NON È FORNITA DA GOOGLE, QUINDI LA IMPOSTIAMO A NULL
          });
          //SALVIAMO IL NUOVO UTENTE NEL DATABASE
          await user.save();
        }

        //PASSIAMO L'UTENTE AL MIDDLEWARE DI PASSPORT
        done(null, user);
      } catch (error) {
        //SE SI VERIFICA UN ERRORE, LO PASSIAMO A PASSPORT
        done(error, null);
      }
    }
  )
);

//SERIALIZZAZIONE DELL'UTENTE PER LA SESSIONE
passport.serializeUser((user, done) => {
  //MEMORIZZIAMO SOLO L'ID DELL'UTENTE NELLA SESSIONE
  done(null, user.id);
});

//DESERIALIZZAZIONE DELL'UTENTE DALLA SESSIONE
passport.deserializeUser(async (id, done) => {
  try {
    //CERCHIAMO L'UTENTE NEL DATABASE USANDO L'ID
    const user = await User.findById(id);
    //PASSIAMO L'UTENTE COMPLETO AL MIDDLEWARE DI PASSPORT
    done(null, user);
  } catch (error) {
    //SE SI VERIFICA UN ERRORE DURANTE LA RICERCA, LO PASSIAMO A PASSPORT
    done(error, null);
  }
});

//Esportiamo la configurazione di Passport
export default passport;
