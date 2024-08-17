// SI IMPORTANO I COMPONENTI NECESSARI DA REACT-ROUTER-DOM PER GESTIRE IL ROUTING
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// SI IMPORTA IL FILE CSS PER GLI STILI DELL'APP
import './App.css'

// SI IMPORTANO I COMPONENTI PERSONALIZZATI DELL'APPLICAZIONE
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from "./pages/Home";
import Gyms from "./pages/Gyms";
import Subscriptions from "./pages/Subscriptions";
import Classes from "./pages/Classes";
import Trainers from "./pages/Trainers";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { IsLoggedInContext, LogoutSuccessContext, UserDataContext } from "./services/context";
import { useState } from "react";
import MyAccount from "./pages/MyAccount";

function App() {

  //SI CREA UNO STATO PER POTER GESTIRE IL FATTO CHE CI SIA UN UTENTE CHE ABBIA FATTO L'ACCESSO O NO
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //SI CREA UNO STATO PER POTER GESTIRE I DATI DELL'UTENTE CHE HA ESEGUITO L'ACCESSO
  const [userData, setUserData] = useState("");

  //CREO UNO STATO PER POTERMI GESTIRE IL MODALE NEL CASO IL LOGOUT SIA AVVENUTO CON SUCCESSSO
  const [logoutSuccess, setLogoutSuccess] = useState(null)

  return (
    <>
      <IsLoggedInContext.Provider value = { { isLoggedIn, setIsLoggedIn } }>
        <UserDataContext.Provider value = { { userData, setUserData } }>
          <LogoutSuccessContext.Provider value = { { logoutSuccess, setLogoutSuccess } }>
            {/* ROUTER AVVOLGE L'INTERA APPLICAZIONE, ABILITANDO IL ROUTING */}
            <Router>
              {/* NAVBAR È RENDERIZZATO IN TUTTE LE PAGINE */}
              <Navbar/>
                {/* IL TAG MAIN CONTIENE IL CONTENUTO PRINCIPALE CHE CAMBIA IN BASE AL ROUTING */}
                <main className="pt-[80px]">
                  {/* ROUTES DEFINISCE LE DIVERSE ROTTE DELL'APPLICAZIONE */}
                  <Routes>
                    {/* Route per la home page */}
                    <Route path="/" element={<Home />} />
                    <Route path="/palestre" element={<Gyms />} />
                    <Route path="/abbonamenti" element={<Subscriptions />} />
                    <Route path="/classi" element={<Classes />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route path="/contatti" element={<Contacts />} />
                    <Route path="/registrazione" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<MyAccount />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              {/* FOOTER È RENDERIZZATO IN TUTTE LE PAGINE */}
              <Footer/>
            </Router>
          </LogoutSuccessContext.Provider>
        </UserDataContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  )
}

export default App
