import { updateSubscription } from "../../../../../services/api";

function RSBDeleteButton({
  setOpenDeleteModal,
  subscriptions,
  setSubscriptions,
  deletingBenefitIndex,
  subscription,
}) {
  //FUNZIONE PER GESITRE IL CLICK EL BOTTONE
  const handleClick = async () => {
    try {
      let benefitsArray = subscription.benefits;

      let removedElement = benefitsArray.splice(deletingBenefitIndex, 1);

      //SI EFFETUA UNA RICHIESTA PUT AL BACKEND PER AGGIORNARE L'ABBONAMENTO
      const response = await updateSubscription(subscription._id, {
        ...subscription,
        benefits: benefitsArray,
      });

      //SI CHIUDE IL MODALE DI CANCELLAZIONE
      setOpenDeleteModal(false);

      //SI AGGIORNA LA PAGINA CON L'ABBOANAMENTO MODIFICATO
      setSubscriptions(
        subscriptions.map((subscription) =>
          subscription._id === response.data._id ? response.data : subscription
        )
      );
    } catch (error) {
      //SI MOSTRANO EVENTUALI ERRORI NELLA CONSOLE
      console.error("Errore nella cancellazione del benefit: ", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white hover:opacity-90 transition-opacity text-red-700 font-semibold w-full py-2 rounded"
    >
      Elimina
    </button>
  );
}

export default RSBDeleteButton;
