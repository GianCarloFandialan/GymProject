import { useEffect, useState } from "react"
import RegisterBirthDate from "./registerform_components/RegisterBirthDate"
import RegisterSubscription from "./registerform_components/RegisterSubscription"
import { createUser } from "../../services/api"
import GoogleButton from "../universals/buttons/GoogleButton"
import ModalSuccess from "../universals/modals/ModalSuccess"
import { useNavigate } from "react-router-dom"
import RegisterModalError from "./RegisterModalError"

function RegisterForm() {

  //CREO UNO STATO PER POTERMI GESTIRE I DATI DEL NUOVO UTENTE CHE SI STA REGISTRANDO
  const [newUser, setNewUser] = useState({
    nome: "",
    cognome: "",
    email: "",
    dataDiNascita: "",
    password: "",
    Subscription: "",
  })

  //HOOK PER LA NAVIGAZIONE
  const navigate = useNavigate();

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {

    const { name, value } = e.target;

    if (name === "nome" || name === "cognome"){
      setNewUser({ ...newUser, [name]: value.charAt(0).toUpperCase()+value.slice(1) });
    } else if (name === "email") {
      setNewUser({ ...newUser, email: value.charAt(0).toLowerCase()+value.slice(1) })
    } else {
      setNewUser({ ...newUser, [name]: value })
    }
  }

  //SI CREA UNO STATO PER GESTIRMI LA VERIFICA CHE LA PASSWORD DI CONFEMRA SIA UGUALE
  const [ confirmPassword, setConfirmPassword ] = useState("")

  //CREO UNO STATO PER POTERMI GESTIRE L'ALERT NEL CASO LE PASSWORD INSERITE NON COMBACINO
  const [ passwordError, setPasswordError ] = useState(false)

  //CREO UNO STATO PER POTERMI GESTIRE IL MODALE NEL CASO L'EMAIL SIA STATA UTILIZZATA PRECEDENTEMENTE
  const [ existingError, setExistingError ] = useState(false)

  //CREO UNO STATO PER POTERMI GESTIRE IL MODALE NEL CASO LA REGSITRAZIONE SIA AVVENUTA CON SUCCESSSO
  const [ success, setSuccess] = useState(null)

  //CREO UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM CHE MI ESEGUE LA FUNZIONE CREATA CON AXIOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword !== newUser.password) {
      setPasswordError(true)
      return;
    }

    try {
      await createUser(newUser)
      console.log(newUser);     
      setPasswordError(false);
      setSuccess(true)
    } catch (error) {
      if (error.response.data.message == `E11000 duplicate key error collection: gymproject.users index: email_1 dup key: { email: \"${newUser.email}\" }`) {
        setExistingError(true)
      } else {
        console.error("Errore nella registrazione dell'utente", error)
      }
    }
  };

  //USEEFFECT CHE REINDERIZZA NELLA HOMEPAGE SOLO NEL CASO LA REGISTRAZIONE SIA AVVENUTA CON SUCCESSO
  useEffect(() => {
    if (success == false) {
      navigate("/")
    }
  }, [success])

  return (
    <>
    {success && <ModalSuccess setSuccess={setSuccess} textHeader={"Benvenuto nella GYMPROJECT!"} textBody={"La registrazione è avvenuta con successo!"}/>}
    <form className="mt-16 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>

        <input
          type="text"
          name="nome"
          id="nome"
          value={newUser.nome} 
          required
          placeholder="Inserisci il nome"
          onChange={handleChange}
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="cognome" className="block text-sm font-medium text-gray-700">
          Cognome
        </label>

        <input
          type="text"
          name="cognome"
          id="cognome"
          value={newUser.cognome} 
          required
          placeholder="Inserisci il cognome"
          onChange={handleChange}
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        {existingError && <RegisterModalError text={"L'email con cui stai provando a registrarti è già in uso"} setExistingError={setExistingError}/>}
        
        <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>

        <input
          type="email"
          name="email"
          id="email"
          value={newUser.email} 
          required
          placeholder="Inserisci l'email "
          onChange={handleChange}
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <RegisterBirthDate handleChange={handleChange} newUser={newUser} />

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Inserisci la password"
          autoComplete="on"
          onChange={handleChange}
          value={newUser.password} 
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="confermapassword" className="block text-sm font-medium text-gray-700">
          Conferma Password
        </label>

        <input
          type="password"
          id="confermapassword"
          name="confermapassword"
          placeholder="Reinserisci la password"
          required
          autoComplete="on"
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>
      
      <div className="col-span-6">
        <label htmlFor="MarketingAccept" className="flex gap-4">
          <input
            type="checkbox"
            id="MarketingAccept"
            name="marketing_accept"
            required
            className="size-5 rounded-md border-gray-200 bg-white shadow-sm accent-black"
          />

          <span className="text-sm text-gray-700">
            Desidero ricevere e-mail su eventi, aggiornamenti di prodotto e annunci aziendali.
          </span>
        </label>
      </div>

      <div className="col-span-6">
        <p className="text-sm text-gray-500">
          Creando un account, accetti
          <a href="#" className="text-gray-700 underline"> i nostri termini e le condizioni </a>
          e 
          <a href="#" className="text-gray-700 underline"> la politica di privacy</a>.
        </p>
      </div>

      <RegisterSubscription newUser={newUser} setNewUser={setNewUser}/>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-center text-center">
        <button
          className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-blue-500"
          type="submit"
        >
          Registrati
        </button>

        <div>
          /
        </div>

        <GoogleButton text={"Registrati "}/>

      </div>
    </form>
    </>
  )
}

export default RegisterForm