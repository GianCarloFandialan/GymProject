// SI IMPORTANO I COMPONENTI NECESSARI DA REACT-ROUTER-DOM PER GESTIRE IL ROUTING
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// SI IMPORTA IL FILE CSS PER GLI STILI DELL'APP
import "./App.css";

// SI IMPORTANO I COMPONENTI PERSONALIZZATI DELL'APPLICAZIONE
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Gyms from "./pages/Gyms";
import Subscriptions from "./pages/Subscriptions";
import Classes from "./pages/Classes";
import Trainers from "./pages/Trainers";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  IsLoggedInContext,
  LogoutSuccessContext,
  UserDataContext,
} from "./services/context";
import { useState } from "react";
import MyAccount from "./pages/MyAccount";
import Chat from "./pages/Chat";

function App() {
  //SI CREA UNO STATO PER POTER GESTIRE IL FATTO CHE CI SIA UN UTENTE CHE ABBIA FATTO L'ACCESSO O NO
  //LO SI UTILIZZA COME VALORE PER IL CONTEXT "IsLoggedInContext"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //SI CREA UNO STATO PER POTER GESTIRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  //LO SI UTILIZZA COME VALORE PER IL CONTEXT "UserDataContext"
  const [userData, setUserData] = useState("");

  //CREO UNO STATO PER POTERMI GESTIRE IL MODALE NEL CASO IL LOGOUT SIA AVVENUTO CON SUCCESSSO
  //LO SI UTILIZZA COME VALORE PER IL CONTEXT "LogoutSuccessContext"
  const [logoutSuccess, setLogoutSuccess] = useState(null);

  return (
    <>
      {/* SI AVVOLGONO I CONTENUTI PRINCIPALI DEL PROGETTO CON IL CONTEXT PER RENDERE GLI STATI CREATI UNIVERSALI E FACILI DA UTILIZZARE */}
      <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <UserDataContext.Provider value={{ userData, setUserData }}>
          <LogoutSuccessContext.Provider
            value={{ logoutSuccess, setLogoutSuccess }}
          >
            {/* ROUTER AVVOLGE L'INTERA APPLICAZIONE, ABILITANDO IL ROUTING */}
            <Router>
              {/* NAVBAR È RENDERIZZATO IN TUTTE LE PAGINE */}
              <Navbar />
              {/* IL TAG MAIN CONTIENE IL CONTENUTO PRINCIPALE CHE CAMBIA IN BASE AL ROUTING */}
              <main className="pt-[80px]">
                {/* ROUTES DEFINISCE LE DIVERSE ROTTE DELL'APPLICAZIONE */}
                <Routes>
                  {/* ROTTA PER LA HOMEPAGE */}
                  <Route path="/" element={<Home />} />
                  {/* ROTTA PER LA PAGINA DELLE PALESTRE */}
                  <Route path="/palestre" element={<Gyms />} />
                  {/* ROTTA PER LA PAGINA DEGLI ABBONAEMNTI */}
                  <Route path="/abbonamenti" element={<Subscriptions />} />
                  {/* ROTTA PER LA PAGINA DELLE CLASSI */}
                  <Route path="/classi" element={<Classes />} />
                  {/* ROTTA PER LA PAGINE DEI TRAINER */}
                  <Route path="/trainers" element={<Trainers />} />
                  {/* ROTTA PER LA PAGINA DEI CONTATTI */}
                  <Route path="/contatti" element={<Contacts />} />
                  {/* ROTTA PER LA PAGINA DELLA REGISTRAZIONE */}
                  <Route path="/registrazione" element={<Register />} />
                  {/* ROTTA PER LA PAGINA DI LOGIN */}
                  <Route path="/login" element={<Login />} />
                  {/* ROTTA PER LA PAGINA DEL PROFILO DELL'UTENTE CHE HA EFFETTUATO L'ACCESSO */}
                  <Route path="/account" element={<MyAccount />} />
                  {/* ROTTA PER LA PAGINA DELLE CHAT */}
                  <Route path="/chat" element={<Chat />} />
                  {/* ROTTA PER LA PAGINA NOT FOUND NEL CASO UN UTENTE CERCHI DI ENTRARE IN ROTTE NON ESISTENTI */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {/* FOOTER È RENDERIZZATO IN TUTTE LE PAGINE */}
              <Footer />
            </Router>
          </LogoutSuccessContext.Provider>
        </UserDataContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  );
}

export default App;
