function MASSBenefits({ benefits }) {
  return (
    <div className="mt-10">
      <div className="mb-2">
        <i className="fas fa-briefcase mr-2 text-3xl font-bold">
          Benefits dell'Abbonamento:
        </i>
      </div>
      {benefits.map((benefit) => {
        return (
          <div className="mb-2" key={benefit}>
            <i className="fas fa-briefcase mr-2 text-lg">- {benefit}</i>
          </div>
        );
      })}
    </div>
  );
}

export default MASSBenefits;
