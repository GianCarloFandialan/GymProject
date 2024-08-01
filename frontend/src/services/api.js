import axios from "axios"; 

const API_URL = "http://localhost:5001/api";

// SI CONFIGURA UN'ISTANZA DI AXIOS CON L'URL DI BASE
const api = axios.create({
  baseURL: API_URL,
});

//FUNZIONI RIGUARDANTI LE CLASSI
export const getClasses = () => api.get('/classes');
export const getSingleClass = (id) => api.get(`/classes/${id}`);
export const createClass = (postData) => api.post("/classes", postData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const updateClass = (id, postData) => api.put(`/classes/${id}`, postData);
export const updateClassCover = (id, postData) => api.patch(`/classes/${id}/cover`, postData);
export const deleteClass = (id) => api.delete(`/classes/${id}`);

//FUNZIONI RIGUARDANTI I CONTENUTI
export const getContents = () => api.get('/contents');
export const getSingleContent = (id) => api.get(`/contents/${id}`);
export const createContent = (postData) => api.post("/contents", postData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const updateContent = (id, postData) => api.put(`/contents/${id}`, postData);
export const updateContentCover = (id, postData) => api.patch(`/contents/${id}/cover`, postData);
export const deleteContent = (id) => api.delete(`/contents/${id}`);

//FUNZIONI RIGUARDANTI LE PALESTRE
export const getGyms = () => api.get('/gyms');
export const getSingleGym = (id) => api.get(`/gyms/${id}`);
export const createGym = (postData) => api.post("/gyms", postData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const updateGym = (id, postData) => api.put(`/gyms/${id}`, postData);
export const updateGymCover = (id, postData) => api.patch(`/gyms/${id}/cover`, postData);
export const deleteGym = (id) => api.delete(`/gyms/${id}`);

//FUNZIONI RIGUARDANTI GLI ABBONAMENTI
export const getSubscriptions = () => api.get('/subscriptions');
export const getSingleSubscriptio = (id) => api.get(`/subscriptions/${id}`);
export const createSubscriptio = (postData) => api.post("/subscriptions", postData);
export const updateSubscriptio = (id, postData) => api.put(`/subscriptions/${id}`, postData);
export const deleteSubscriptio = (id) => api.delete(`/subscriptions/${id}`);

//FUNZIONI RIGUARDANTI GLI UTENTI
export const getUsers = () => api.get('/users');
export const getSingleUser = (id) => api.get(`/users/${id}`);
export const createUser = (postData) => api.post("/users", postData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const updateUser = (id, postData) => api.put(`/users/${id}`, postData);
export const updateUserCover = (id, postData) => api.patch(`/users/${id}/cover`, postData);
export const deleteUser = (id) => api.delete(`/users/${id}`);


//FUNZIONI RIGUARDANTI I MESSAGGI
export const getMessages = () => api.get(`/users/${id}/messages`);
export const createMessage = (postData) => api.post(`/users/${id}/messages`, postData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const createMessageSpecial = (postData) => api.post(`/users/${id}/messages/pdf`, postData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});