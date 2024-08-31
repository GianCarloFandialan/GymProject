const controlloMail = (req, res, next) => {
  const emailAutorizzata = "autorizzato@mail.it";

  const mailUtente = req.headers["user-email"];

  if (mailUtente === emailAutorizzata) {
    //SE L'EMAIL CORRISPONDE, PASSIAMO AL PROSSIMO MIDDLEWARE O ALLA ROUTE HANDLER
    next();
  } else {
    //SE L'EMAIL NON CORRISPONDE, INVIAMO UN ERRORE
    res
      .status(403)
      .json({ message: "ACCESSO NEGATO: Utente non autorizzato." });
  }
};

export default controlloMail;
