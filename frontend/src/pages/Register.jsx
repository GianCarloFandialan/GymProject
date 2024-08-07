import RegisterForm from "../components/register/RegisterForm"
import RegisterHeroImg from "../components/register/RegisterHeroImg"
import RegisterHeroTxt from "../components/register/RegisterHeroTxt"
import RegisterLogin from "../components/register/RegisterLogin"

function Register() {
  return (
    <section className="bg-white lg:-mt-[80px]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">

        <RegisterHeroImg/>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">

            <RegisterHeroTxt/>

            <RegisterForm/>
 
            <RegisterLogin/>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Register