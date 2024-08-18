function RegisterEmail({ children, newUser, handleChange }) {
  return (
    <div className="col-span-6 sm:col-span-3">
      {children}

      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        {" "}
        Email{" "}
      </label>

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
  );
}

export default RegisterEmail;
