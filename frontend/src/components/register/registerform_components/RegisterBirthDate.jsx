function RegisterBirthDate() {

  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  //Add a zero if one Digit (eg: 05,09)
  if (dd < 10) {
    dd = "0" + dd;
  }

  //Add a zero if one Digit (eg: 05,09)
  if (mm < 10) {
    mm = "0" + mm;
  }

  var maxYear = yyyy - 18; //Calculate Maximum Age (>18)

  var max = maxYear + "-" + mm + "-" + dd;

  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor="Birthday" className="block text-sm font-medium text-gray-700"> Data di Nascita </label>

      <input
        type="date"
        id="Birthday"
        name="Birthday"
        max={max}
        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
      />
    </div>
  )
}

export default RegisterBirthDate