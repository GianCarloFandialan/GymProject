import { useState } from "react";
import Label from "../../../universals/forms_components/Label";
import ModalButtonSection from "../../../universals/forms_components/ModalButtonSection";
import ModifyInput from "../../admin_universal_components/ModifyInput";
import { updateContent, updateContentCover } from "../../../../services/api";

function MHSModalForm({
  content,
  setOpenModal,
  contents,
  setContents,
  setOpenModalSuccess,
}) {
  //STATO PER GESITRE I DATI DEL FORM
  const [contentData, setContentData] = useState(content);

  //FUNZIONE PER GESTIRE I CAMBAIMANETI DEGLI INPUT NEL FORM E INTEGRARLI NELLO STATO
  function handleChange(e) {
    const { name, value } = e.target;

    //NOME E COGNOME INIZIANO SEMPRE CON LA MAIUSCOLA
    setContentData({
      ...contentData,
      [name]: value,
    });
  }

  //SI CREA UNO STATO PER POTERMI GESTIRE IL FILE CARICATO
  const [coverFile, setCoverFile] = useState(null);

  //SI GESTISCE IL CARICAMENTO DEL FILE DELL'IMMAGINE
  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  //SI CREA UNO STATO PER POTER GESTIRE L'ALERT DI AGGIUNTA CON ERRORE
  const [errorAlert, setErrorAlert] = useState(false);

  //SI CREA UNA FUNZIONE PER GESTIRE IL SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coverFile) {
      try {
        const formData = new FormData();

        //SI AGGIUNGONO I VARI DATI CHE SERVONO AFFINCHE SI MODIFICHI CORRETTAMENTE LA CONTENUTO
        Object.keys(contentData).forEach((key) =>
          formData.append(key, contentData[key])
        );

        //SI AGGIUNGE ANCHE LA FOTO DEL CONTENUTO
        if (coverFile) {
          formData.append("cover", coverFile);
        }

        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL CONTENUTO
        const response = await updateContentCover(content._id, formData);

        //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DEL CONTENUTO
        setOpenModalSuccess(true);

        //SI AGGIORNA LA PAGINA CON IL CONTENUTO MODIFICATO
        setContents(
          contents.map((content) =>
            content._id === response.data._id ? response.data : content
          )
        );

        //SI CHIUDE IL MODALE DEL FORM
        setOpenModal(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella modifica della homepage: ", error);
        setErrorAlert(true);
      }
    } else {
      try {
        //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE IL CONTENUTO
        const response = await updateContent(content._id, contentData);

        //SI AGGIORNA LO STATO DI SUCCESSO NELLA MODIFICA DELLA CONTENUTO
        setOpenModalSuccess(true);

        //SI AGGIORNA LA PAGINA CON UL CONTENUTO MODIFICATO
        setContents(
          contents.map((content) =>
            content._id === response.data._id ? response.data : content
          )
        );

        //SI CHIUDE IL MODALE DEL FORM
        setOpenModal(false);
      } catch (error) {
        //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
        console.error("Errore nella modifica della homepage: ", error);
        setErrorAlert(true);
      }
    }
  };

  return (
    <>
      {errorAlert && <ChangeErrorAlert setErrorAlert={setErrorAlert} />}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="p-6 pt-0 grid gap-6">
          {/* INPUT PER LA DESCRIZIONE */}
          {/* SI PASSANO COME VARIABILI I DATI DELL'INPUT E LO STATO DEL NUOVO CONTENUTO CON RELATIVA FUNZIONE CHE CAMBIA IL SUO VALORE AL CAMBIAMENTO DEL VALORE DI INPUT*/}
          <ModifyInput
            element={"description"}
            content={"Descrizione"}
            handleChange={handleChange}
            contentData={contentData}
            value={contentData.description}
          />

          <div className="grid gap-2">
            <Label html={"cover"} content={"Foto Sezione"} />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white cursor-pointer text-center"
              id={"cover"}
              placeholder={"Inserisci una foto del trainer"}
              name={"cover"}
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <ModalButtonSection setOpenModal={setOpenModal} content={"Modifica"} />
      </form>
    </>
  );
}

export default MHSModalForm;
