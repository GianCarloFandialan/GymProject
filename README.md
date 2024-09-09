# Gym Project

Benvenuto nel progetto Gym, un'applicazione web full-stack creata utilizzando il stack MERN (MongoDB, Express, React, Node.js). Questa applicazione è progettata per gestire e interagire con una palestra, offrendo una varietà di funzionalità per i clienti e i trainer.

## Sommario

- [Descrizione del Progetto](#descrizione-del-progetto)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Funzionalità](#funzionalità)
- [Installazione](#installazione)
- [Uso](#uso)
- [Contatti](#contatti)

## Descrizione del Progetto

Il progetto Gym è un'applicazione web che consente ai clienti di una palestra di gestire il loro abbonamento, visualizzare le sedi delle palestre, iscriversi a corsi, comunicare con i loro trainer e altro ancora.
Lato admin side invece è possibile gestire il contenuto delle pagine visualizzate dai clienti con una pagina apposita acessibile solo dagli admin del sito.
L'applicazione è costruita utilizzando React e Tailwind CSS per il frontend, e Node.js con Express e MongoDB per il backend.

## Tecnologie Utilizzate

- **Frontend:**

  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Router](https://reactrouter.com/)
  - [Axios](https://axios-http.com/)
  - [React Query](https://react-query.tanstack.com/)

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [JSON Web Token](https://jwt.io/) (JWT) per l'autenticazione
  - [Passport.js](http://www.passportjs.org/) per l'autenticazione con Google

## Funzionalità

- **Homepage:** Una panoramica delle funzionalità e dei servizi della palestra.
- **Palestre:** Visualizza le sedi delle palestre con descrizioni dettagliate.
- **Classi:** Visualizza i corsi offerti e i relativi orari.
- **Trainer:** Elenco dei trainer disponibili con la possibilità di aggiungerli ai propri preferiti e avviare una chat.
- **Contatti:** Domande frequenti e informazioni di contatto, inclusi i numeri verdi.
- **Login:** Login tradizionale con username e password o tramite Google.
- **Registrazione:** Registrazione dei nuovi utenti con selezione obbligatoria di un abbonamento e metodo di pagamento.
- **My Account:** Dettagli dell'account e dell'abbonamento dell'utente.
- **Chat:** Sistema di messaggistica che permette ai clienti di chattare con i loro trainer e viceversa.

## Installazione

Per installare e avviare il progetto localmente, segui questi passaggi:

### Prerequisiti

Assicurati di avere installato sulla tua macchina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (viene installato automaticamente con Node.js)
- [MongoDB](https://www.mongodb.com/)

### Clone del Repository

Clona il repository GitHub:

bash
git clone https://github.com/tuo-username/gym-project.git

## Installazione del Frontend e Backend

1.  **Backend:**
    Apri un terminale, naviga nella cartella del backend e installa le dipendenze:
    `cd gym-project/backend
npm install`
    Avvia il server backend:
    `node server.js`
2.  **Frontend:**
    Apri un terminale, naviga nella cartella del backend e installa le dipendenze:
    `cd gym-project/frontend npm install
npm install`
    Avvia il server backend:
    `npm run dev`

### Uso

Una volta avviati sia il server backend che il server frontend, puoi accedere all'applicazione visitando `http://localhost:3000` (o l'URL fornito dal server Vite).

### Contatti

Per qualsiasi domanda o suggerimento, contattaci all'indirizzo email: gianchifandialan03@gmail.com.

Oppure visita il nostro repository GitHub per contributi: [https://github.com/GianCarloFandialan/GymProject](https://github.com/GianCarloFandialan/GymProject).

Grazie per aver utilizzato il nostro progetto Gym! Speriamo che la nostra applicazione possa soddisfare tutte le tue esigenze di gestione della palestra.
