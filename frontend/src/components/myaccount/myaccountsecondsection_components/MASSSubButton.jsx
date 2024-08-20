import { Link } from "react-router-dom";

function MASSSubButton() {
  return (
    <div className="mt-10 mb-10">
      <Link
        to={"/Abbonamenti"}
        className="text-xl font-black border-[1px] border-black rounded-full p-4 hover:text-white hover:bg-black"
      >
        Modifica Abbonamento
      </Link>
    </div>
  );
}

export default MASSSubButton;
