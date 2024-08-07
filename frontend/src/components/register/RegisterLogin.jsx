function RegisterLogin(params) {
  return (
    <>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-neutral-600 bg-white"> Oppure </span>
        </div>
      </div>

      <div>
        <p className="px-2 text-neutral-600 bg-white text-center">
          Hai già un account? 
          <a href="#" className="text-gray-700 underline"> Log in</a>.
        </p>
      </div>  
    </>
  )
}

export default RegisterLogin