import LoginForm from "../components/login/LoginForm"
import RegisterGoogle from "../components/universals/buttons/GoogleButton"
import GoogleButton from "../components/universals/buttons/GoogleButton"

function Login() {
  return(
    <>
      <section className="lg:h-[calc(95vh_-_80px)] flex justify-center items-center flex-col">
        <h2 className="font-bold text-5xl mb-3 font-NCLMonsterBeast shadow-sm">Login</h2>
        <div className="w-[30vw] p-10 rounded-3xl shadow-2xl  ">
            <LoginForm/>
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-neutral-600 bg-white"> Oppure </span>
                </div>
            </div>
            <div>
                {/* <button type="submit" className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48">
                            <defs>
                                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
                            </defs>
                            <clipPath id="b">
                                <use xlinkHref="#a" overflow="visible"></use>
                            </clipPath>
                            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
                            <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
                            <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
                            <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
                        </svg>
                        <span className="ml-4"> Log in con Google</span>
                    </div>
                </button> */}
                <GoogleButton text={"Login"}/>
            </div>
        </div>
      </section>
    </>
  )
}

export default Login