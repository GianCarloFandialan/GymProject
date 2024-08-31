function RegisterBirthDate({ handleChange, newUser }) {
  //VARIBAILI CHE MI SERVONO PER AVERE COME INPUT UN'ETÀ MINIMA DI 18 ANNI
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (dd < 10) {
    dd = "0" + dd;
  }

  //SI AGGIUNE UNO ZERO NEL CASO FOSSE SOLO AD UNA CIFRA
  if (mm < 10) {
    mm = "0" + mm;
  }

  var maxYear = yyyy - 18; //CALCOLO L'ANNO MINIMO (>18)

  //CALCOLO LA DATA MINIMA
  var max = maxYear + "-" + mm + "-" + dd;

  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="dataDiNascita"
        className="block text-sm font-medium text-gray-700"
      >
        {" "}
        Data di Nascita{" "}
      </label>

      <input
        type="date"
        id="dataDiNascita"
        name="dataDiNascita"
        required
        max={max}
        onChange={handleChange}
        value={newUser.dataDiNascita}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  );
}

export default RegisterBirthDate;
