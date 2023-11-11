import React from "react";

function Cards() {
  return (
    <div className="m-4 p-4 border row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div className="col">
        <div className="card border-primary">
          <div className="card-header">Header</div>
          <div className="card-body text-primary">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card border-primary">
          <div className="card-header">Header</div>
          <div className="card-body text-primary">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card border-primary">
          <div className="card-header">Header</div>
          <div className="card-body text-primary">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card border-primary">
          <div className="card-header">Header</div>
          <div className="card-body text-primary">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
