function RegisterHeroImg() {
  return (
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 ">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="w-full h-full opacity-55 bg-black"></div>

      <div className="hidden lg:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex lg:flex-col lg:justify-center lg:p-12 ">
        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-6xl font-NCLMonsterBeast text-center">
          <span className="text-white inline-block" href="#">                
            <svg className="h-8 sm:h-14" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
            </svg>
          </span>
          GYMPROJECT Family
        </h2>

        <p className="mt-4 leading-relaxed text-white/90 lg:text-xl text-center font-bold">
          Rendi ogni allenamento un capolavoro. Unisciti a GYMPROJECT per allenamenti innovativi, attrezzature all'avanguardia e il supporto dei migliori trainer. Iscriviti ora e trasforma il tuo benessere!
        </p>
      </div>
    </section>
  )
}

export default RegisterHeroImg