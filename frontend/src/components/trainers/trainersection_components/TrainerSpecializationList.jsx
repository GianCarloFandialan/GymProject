import TrainerSpecializationCheck from "./TrainerSpecializationCheck";

function TrainerSpecializationList({ specializations }) {
  return (
    <ul role="list" className="pt-6 my-6 space-y-6 border-t">
      {specializations.map((spcialization) => {
        return (
          <li className="flex" key={spcialization}>
            <TrainerSpecializationCheck />
            <span className="ml-3 text-white lg:text-2xl">{spcialization}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default TrainerSpecializationList;
