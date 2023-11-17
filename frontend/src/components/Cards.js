function Cards({ cards }) {
  return (
    <div className="p-4 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {cards.map((card, index) => {
        return (
          <div className="col" key={index}>
            <div className="card bg-dark shadow-lg">
              <div className="card-body text-white text-center">
                <div className="d-flex justify-content-center">
                  <h5 className="card-title">{card.data}</h5>{" "}
                  <small className="text-success fw-bolder">
                    {card.progress}
                  </small>
                </div>
                <p className="card-text">{card.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
