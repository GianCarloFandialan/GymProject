//400 - BAD REQUEST - GESTISCE ERRORI DI RICHIESTE MAL FORMATE O DATI NON VALIDI
export const badRequestHandler = (err, req, res, next) => {
  //VERIFICA SE L'ERRORE HA STATUS 400 O SE È UN ERRORE DI VALIDAZIONE
  if (err.status === 400 || err.name === "ValidationError") {
    //INVIA UNA RISPOSTA JSON CON STATUS 400
    res.status(400).json({
      error: "RICHIESTA NON VALIDA",
      message: err.message, //UTILIZZA IL MESSAGGIO DI ERRORE ORIGINALE
    });
  } else {
    //SE NON È UN ERRORE 400, PASSA AL PROSSIMO MIDDLEWARE DI GESTIONE ERRORI
    next(err);
  }
};

//401 - UNAUTHORIZED - GESTISCE ERRORI DI AUTENTICAZIONE
export const unauthorizedHandler = (err, req, res, next) => {
  //VERIFICA SE L'ERRORE HA STATUS 401
  if (err.status === 401) {
    //INVIA UNA RISPOSTA JSON CON STATUS 401
    res.status(401).json({
      error: "ERRORE DI AUTENTICAZIONE",
      message: "Richiesta nuova autenticazione",
    });
  } else {
    //SE NON È UN ERRORE 401, PASSA AL PROSSIMO MIDDLEWARE DI GESTIONE ERRORI
    next(err);
  }
};

//404 - NOT FOUND - RICHIESTE A RISORSE NON ESISTENTI
export const notFoundHandler = (req, res, next) => {
  //QUESTO MIDDLEWARE NON HA UN CONTROLLO DELL'ERRORE PERCHÉ GESTISCE TUTTE LE RICHIESTE, CHE ARRIVANO A QUESTO PUNTO SENZA ESSERE STATE GESTITE DA ALTRE ROTTE
  res.status(404).json({
    error: "RISORSA NON TROVATA",
    message: "La risorsa richiesta non è stata trovata",
  });
};

//500 - INTERNAL SERVER ERROR - GESTISCE TUTTI GLI ALTRI ERRORI NON SPECIFICATI
export const genericErrorHandler = (err, req, res, next) => {
  //LOGGA LO STACK TRACE DELL'ERRORE PER DEBUG
  console.error(err.stack);

  //INVIA UNA RISPOSTA GENERICA PER TUTTI GLI ALTRI TIPI DI ERRORI
  res.status(500).json({
    error: "Internal Server Error",
    message: "Errore generico",
  });
};
