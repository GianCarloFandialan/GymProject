function RegisterName({ newUser, handleChange }) {
  return (
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
  );
}

export default RegisterName;
