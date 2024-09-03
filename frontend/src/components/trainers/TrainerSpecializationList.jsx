function TrainerSpecializationList({ specializations }) {
  return (
    <ul role="list" className="pt-6 my-6 space-y-6 border-t">
      {specializations.map((spcialization) => {
        return (
          <li className="flex" key={spcialization}>
            <div className="inline-flex items-center min-w-6 h-6 bg-white rounded-full">
              <svg
                className="flex-shrink-0 w-4 h-4 mx-auto text-neutral-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="ml-3 text-white lg:text-2xl">{spcialization}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default TrainerSpecializationList;
