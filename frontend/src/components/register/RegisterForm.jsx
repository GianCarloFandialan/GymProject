import RegisterBirthDate from "./registerform_components/RegisterBirthDate"
import RegisterGoogle from "./registerform_components/RegisterGoogle"

function RegisterForm() {
  return (
    <form action="#" className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="Nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>

        <input
          type="text"
          id="Nome"
          name="Nome"
          placeholder="Inserisci il nome"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="Cognome" className="block text-sm font-medium text-gray-700">
          Cognome
        </label>

        <input
          type="text"
          id="Cognome"
          name="Cognome"
          placeholder="Inserisci il cognome"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

        <input
          type="email"
          id="Email"
          name="email"
          placeholder="Inserisci l'email "
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <RegisterBirthDate/>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

        <input
          type="password"
          id="Password"
          name="password"
          placeholder="Inserisci la password"
          autoComplete="on"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="ConfermaPassword" className="block text-sm font-medium text-gray-700">
          Conferma Password
        </label>

        <input
          type="password"
          id="ConfermaPassword"
          name="ConfermaPassword"
          placeholder="Reinserisci la password"
          autoComplete="on"
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
        />
      </div>

      <div className="col-span-6">
        <label htmlFor="MarketingAccept" className="flex gap-4">
          <input
            type="checkbox"
            id="MarketingAccept"
            name="marketing_accept"
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

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-center text-center">
        <button
          className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-blue-500"
        >
          Registrati
        </button>

        <div>
          /
        </div>

        <RegisterGoogle/>
      </div>
    </form>
  )
}

export default RegisterForm