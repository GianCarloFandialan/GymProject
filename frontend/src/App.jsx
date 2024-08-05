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

function App() {
  return (
    <>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        {/* FOOTER È RENDERIZZATO IN TUTTE LE PAGINE */}
        <Footer/>
      </Router>
    </>
  )
}

export default App
