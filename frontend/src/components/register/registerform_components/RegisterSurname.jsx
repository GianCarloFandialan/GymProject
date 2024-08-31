function RegisterSurname({ newUser, handleChange }) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="cognome"
        className="block text-sm font-medium text-gray-700"
      >
        Cognome
      </label>

      <input
        type="text"
        name="cognome"
        id="cognome"
        //AL MODIFICARSI DEL VALORE DELL'INPUT, CAMBIA PURE LO STATO
        value={newUser.cognome}
        required
        placeholder="Inserisci il cognome"
        onChange={handleChange}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
}

export default RegisterSurname;
