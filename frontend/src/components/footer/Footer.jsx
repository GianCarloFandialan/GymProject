function Footer() {
  return(
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl cursor-pointer font-ZENOVAXENO ">
            GYMPROJECT
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Crediamo che il fitness sia più di un semplice allenamento; è uno stile di vita. Siamo dedicati a fornire un ambiente stimolante e sicuro dove puoi crescere, imparare e trasformarti.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> About </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> History </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
          </li>
        </ul>


      </div>
    </footer>
  )
}

export default Footer