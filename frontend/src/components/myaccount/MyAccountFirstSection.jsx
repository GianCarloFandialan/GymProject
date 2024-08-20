function MyAccounFirstSection() {
  return (
    <section className="relative block h-[500px]">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url("https://plus.unsplash.com/premium_photo-1664109999781-27f77214bcfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-50 bg-black"
        ></span>
      </div>
    </section>
  );
}

export default MyAccounFirstSection;
