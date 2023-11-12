import React from "react";

import {
  BsArrowDownLeftSquareFill,
  BsArrowUpRightSquareFill,
} from "react-icons/bs";

function Cards() {
  return (
    <div className="my-4 p-4 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <div className="col">
        <div className="card bg-dark shadow-lg">
          <div className="card-body text-white text-center">
            <div className="d-flex justify-content-center">
              <h5 className="card-title">
                $ 12.34{" "}
                <BsArrowUpRightSquareFill className="fs-4 mb-1 text-success" />
              </h5>{" "}
              <small className="text-success fw-bolder">+ 3.5%</small>
            </div>
            <p className="card-text">Potential Growth</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card bg-dark shadow-lg">
          <div className="card-body text-white text-center">
            <div className="d-flex justify-content-center">
              <h5 className="card-title">
                $ 17.34{" "}
                <BsArrowUpRightSquareFill className="fs-4 mb-1 text-success" />
              </h5>{" "}
              <small className="text-success fw-bolder">+ 11%</small>
            </div>
            <p className="card-text">Revenue Current</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card bg-dark shadow-lg">
          <div className="card-body text-white text-center">
            <div className="d-flex justify-content-center">
              <h5 className="card-title">
                $ 12.34{" "}
                <BsArrowDownLeftSquareFill className="fs-4 mb-1 text-danger" />
              </h5>{" "}
              <small className="text-danger fw-bolder">- 2.4%</small>
            </div>
            <p className="card-text">Daily Income</p>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card bg-dark shadow-lg">
          <div className="card-body text-white text-center">
            <div className="d-flex justify-content-center">
              <h5 className="card-title">
                $ 12.34{" "}
                <BsArrowUpRightSquareFill className="fs-4 mb-1 text-success" />
              </h5>
              <small className="text-success fw-bolder">+ 3.5%</small>
            </div>

            <p className="card-text">Expense Current</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
