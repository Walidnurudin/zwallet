/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "components/module";

function ConfirmationTransfer({
  name,
  noTelp,
  amount,
  balance,
  date,
  notes,
  handleSubmit,
}) {
  return (
    <div
      style={{
        padding: "30px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "25px",
        marginTop: "40px",
        marginBottom: "40px",
        background: "#ffffff",
      }}
    >
      <div>
        <h5 className="nunito-700">Transfer To</h5>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "40px",
          }}
        >
          <div className="d-flex">
            <img
              src="../assets/images/landing-page/user1.png"
              alt="porfile"
              width="56px"
            />
            <div className="ms-3">
              <h5 className="nunito-600">{name}</h5>
              <span className="nunito-400 font-thrid">{noTelp || "-"}</span>
            </div>
          </div>
        </div>

        <h5 className="nunito-700">Details</h5>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "25px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Amount</span>
              <h5 className="nunito-600 mt-2">{amount}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Balance Left</span>
              <h5 className="nunito-600 mt-2">{balance}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Date & Time</span>
              <h5 className="nunito-600 mt-2">{date}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex"
          style={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Notes</span>
              <h5 className="nunito-600 mt-2">{notes}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-end"
          style={{ marginTop: "35px" }}
        >
          <Button name="Continue" handleClick={handleSubmit} width="170px" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationTransfer;
