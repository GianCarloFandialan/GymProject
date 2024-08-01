import mailgun from "mailgun-js";

// CONFIGURAZIONE DELL'ISTANZA DI MAILGUN CON LE CREDENZIALI DALL'AMBIENTE
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// FUNZIONE PER INVIARE EMAIL
export const sendEmail = async (to, subject, htmlContent) => {
  // SI PREPARANO I DATI DELL'EMAIL
  const data = {
    from: "Gym Project <noreply@yourdomain.com>", // MITTENTE DELL'EMAIL
    to, // DESTINATARIO
    subject, // OGGETTO DELL'EMAIL
    html: htmlContent, // CONTENUTO HTML DELL'EMAIL
  };

  try {
    // SI INVIA L'EMAIL USANDO MAILGUN
    const response = await mg.messages().send(data);
    console.log("Email inviata con successo:", response);
    return response; // RESTITUISCE LA RISPOSTA DI MAILGUN
  } catch (error) {
    // GESTIONE DEGLI ERRORI
    console.error("Errore nell'invio dell'email:", error);
    throw error; // RILANCIA L'ERRORE PER PERMETTERE LA GESTIONE ESTERNA
  }
};