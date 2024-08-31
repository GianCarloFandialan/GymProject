function RegisterPassword({ newUser, handleChange }) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        {" "}
        Password{" "}
      </label>

      <input
        type="password"
        id="password"
        name="password"
        placeholder="Inserisci la password"
        autoComplete="on"
        //AL MODIFICARSI DEL VALORE DELL'INPUT, CAMBIA PURE LO STATO
        onChange={handleChange}
        value={newUser.password}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
}

export default RegisterPassword;
