function RegisterConfirmPassword({ confirmPassword, setConfirmPassword }) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="confermapassword"
        className="block text-sm font-medium text-gray-700"
      >
        Conferma Password
      </label>

      <input
        type="password"
        id="confermapassword"
        name="confermapassword"
        placeholder="Reinserisci la password"
        required
        autoComplete="on"
        //AL MODIFICARSI DEL VALORE DELL'INPUT, CAMBIA PURE LO STATO
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
}

export default RegisterConfirmPassword;
