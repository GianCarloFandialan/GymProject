import Label from "../../../../subscriptions/newsubscriptionmodal_components/form_components/Label";

function NewTrainerSpecialization({
  specializationData,
  setSpecializationData,
}) {
  let specializations = ["", "", ""];

  //SI CREA UNA FUNZIONE PER POTER GESTIRE PIÙ FACILMENTE IL CAMBIAMENTO DEI VALORI DI INPUT
  const handleSpecializationChange = (e, index) => {
    //COPIA L'ARRAY specializationData
    const newSpecializations = [...specializationData];
    //AGGIORNA L'ELEMENTO ALL'INDICE SPECIFICO
    newSpecializations[index] = e.target.value;
    //IMPOSTA IL NUOVO STATO
    setSpecializationData(newSpecializations);
  };

  return (
    <>
      {specializations.map((specialization, index) => {
        return (
          <div className="grid gap-2" key={specialization + index}>
            <Label
              html={`specialità${index}`}
              content={`Specialità ${index + 1}`}
            />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
              id={`specialità${index}`} //id reso unico per ogni input
              placeholder={`Inserisci la specialità ${index + 1}`}
              required
              name={`specialità${index}`}
              value={specializationData[index]}
              onChange={(e) => handleSpecializationChange(e, index)} //PASSA L'INDICE CORRETTO
            />
          </div>
        );
      })}
    </>
  );
}

export default NewTrainerSpecialization;
