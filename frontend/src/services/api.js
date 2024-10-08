import axios from "axios";

const API_URL = "https://gymproject-ua1j.onrender.com/api/";

//SI CONFIGURA UN'ISTANZA DI AXIOS CON L'URL DI BASE
const api = axios.create({
  baseURL: API_URL,
});

//Aggiungi un interceptor per includere il token in tutte le richieste
api.interceptors.request.use(
  (config) => {
    //Recupera il token dalla memoria locale
    const token = localStorage.getItem("token");
    if (token) {
      //Se il token esiste, aggiungilo all'header di autorizzazione
      config.headers["Authorization"] = `Bearer ${token}`;
      //console.log("Token inviato:", token); //Log del token inviato per debugging
    }
    return config; //Restituisce la configurazione aggiornata
  },
  (error) => {
    //Gestisce eventuali errori durante l'invio della richiesta
    return Promise.reject(error);
  }
);

//FUNZIONI RIGUARDANTI LE CLASSI
export const getClasses = () => api.get("/classes");
export const getSingleClass = (id) => api.get(`/classes/${id}`);
export const createClass = (postData) =>
  api.post("/classes", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateClass = (id, postData) =>
  api.put(`/classes/${id}`, postData);
export const updateClassCover = (id, postData) =>
  api.patch(`/classes/${id}/cover`, postData);
export const deleteClass = (id) => api.delete(`/classes/${id}`);

//FUNZIONI RIGUARDANTI I CONTENUTI
export const getContents = () => api.get("/contents");
export const getSingleContent = (id) => api.get(`/contents/${id}`);
export const createContent = (postData) =>
  api.post("/contents", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateContent = (id, postData) =>
  api.put(`/contents/${id}`, postData);
export const updateContentCover = (id, postData) =>
  api.patch(`/contents/${id}/cover`, postData);
export const deleteContent = (id) => api.delete(`/contents/${id}`);

//FUNZIONI RIGUARDANTI LE PALESTRE
export const getGyms = () => api.get("/gyms");
export const getSingleGym = (id) => api.get(`/gyms/${id}`);
export const createGym = (postData) =>
  api.post("/gyms", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateGym = (id, postData) => api.put(`/gyms/${id}`, postData);
export const updateGymCover = (id, postData) =>
  api.patch(`/gyms/${id}/cover`, postData);
export const deleteGym = (id) => api.delete(`/gyms/${id}`);

//FUNZIONI RIGUARDANTI GLI ABBONAMENTI
export const getSubscriptions = () => api.get("/subscriptions");
export const getSingleSubscription = (id) => api.get(`/subscriptions/${id}`);
export const createSubscription = (postData) =>
  api.post("/subscriptions", postData);
export const updateSubscription = (id, postData) =>
  api.put(`/subscriptions/${id}`, postData);
export const deleteSubscription = (id) => api.delete(`/subscriptions/${id}`);

//FUNZIONI RIGUARDANTI I CONTATTI
export const getContacts = () => api.get("/contacts");
export const getSingleContact = (id) => api.get(`/contacts/${id}`);
export const createContact = (postData) => api.post("/contacts", postData);
export const updateContact = (id, postData) =>
  api.put(`/contacts/${id}`, postData);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

//FUNZIONI RIGUARDANTI GLI UTENTI
export const getUsers = () => api.get("/users");
export const getSingleUser = (id) => api.get(`/users/${id}`);
export const createUser = (postData) =>
  api.post("/users", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateUser = (id, postData) => api.put(`/users/${id}`, postData);
export const updateUserAvatar = (id, postData) =>
  api.patch(`/users/${id}/avatar`, postData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

//FUNZIONI RIGUARDANTI I MESSAGGI
export const getMessages = () => api.get(`/messages`);
export const createMessage = (postData) => api.post(`/messages`, postData);
export const createMessageSpecial = (postData) =>
  api.post(`/messages`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

//FUNZIONE PER EFFETTUARE IL LOGIN
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    console.log("Risposta API login:", response.data);
    return response.data;
  } catch (error) {
    console.error("Errore nella chiamata API di login:", error);
    throw error;
  }
};

//FUNZIONE PER OTTENERE I DATI DELL'UTENTE ATTUALMENTE AUTENTICATO
export const getMe = () =>
  api.get("/auth/me").then((response) => response.data);

//FUNZIONE PER OTTENERE I DATI DELL'UTENTE ATTUALMENTE AUTENTICATO
export const getUserData = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero dei dati utente:", error);
    throw error;
  }
};
