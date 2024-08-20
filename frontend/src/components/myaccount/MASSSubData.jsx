function MASSSubData({ start, method }) {
  return (
    <div className="mt-10 mb-10">
      <div className="mb-2">
        <i className="fas fa-briefcase mr-2 text-3xl font-bold">
          Dati dell'abbonamento:
        </i>
      </div>
      <div className="mb-2">
        <i className="fas fa-briefcase mr-2 text-lg">
          -Inizio sottoscrizione: {start.slice(8, 10)}-{start.slice(5, 7)}-
          {start.slice(0, 4)}
        </i>
      </div>
      <div className="mb-2">
        <i className="fas fa-briefcase mr-2 text-lg">
          -Metodo di pagamento:
          {method == "card" ? " Carta di credito" : ""}
          {method == "paypal" ? " Paypal" : ""}
          {method == "applepay" ? " Apple Pay" : ""}
        </i>
      </div>
    </div>
  );
}

export default MASSSubData;
