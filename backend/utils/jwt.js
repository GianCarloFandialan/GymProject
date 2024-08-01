import jwt from 'jsonwebtoken';

// FUNZIONE PER GENERARE UN TOKEN JWT
export const generateJWT = (payload) => {
  // RESTITUISCE UNA PROMISE PER GESTIRE L'OPERAZIONE IN MODO ASINCRONO
  return new Promise((resolve, reject) => 
    // SI UTILIZZA IL METODO SIGN DI JWT PER CREARE UN NUOVO TOKEN
    jwt.sign(
      payload, 
      process.env.JWT_SECRET,
      { expiresIn: "1 day" }, 
      (err, token) => {
        // CALLBACK CHE GESTISCE IL RISULTATO DELL'OPERAZIONE
        if (err) reject(err); // SE C'È UN ERRORE, RIFIUTA LA PROMISE
        else resolve(token);  // ALTRIMENTI, RISOLVE LA PROMISE CON IL TOKEN GENERATO
      }
    )
  );
};

// FUNZIONE PER VERIFICARE UN TOKEN JWT
export const verifyJWT = (token) => {
  // RESTITUISCE UNA PROMISE PER GESTIRE L'OPERAZIONE IN MODO ASINCRONO
  return new Promise((resolve, reject) => 
    // SI UTILIZZA IL METODO VERIFY DI JWT PER DECODIFICARE E VERIFICARE IL TOKEN
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // CALLBACK CHE GESTISCE IL RISULTATO DELL'OPERAZIONE
      if (err) reject(err);  // SE C'È UN ERRORE RIFIUTA LA PROMISE
      else resolve(decoded); // ALTRIMENTI, RISOLVE LA PROMISE CON IL PAYLOAD DECODIFICATO
    })
  );
};