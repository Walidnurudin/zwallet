/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "components/module";

export default function Status({
  name,
  noTelp,
  amount,
  balance,
  date,
  notes,
  isSuccess,
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
        {isSuccess ? (
          <div className="text-center" style={{ padding: "30px 0px" }}>
            <img
              src="../assets/images/transaction/success.png"
              alt="success"
              width="70px"
            />
            <h5 className="nunito-700" style={{ marginTop: "30px" }}>
              Transfer Success
            </h5>
          </div>
        ) : (
          <div className="text-center" style={{ padding: "30px 0px" }}>
            <img
              src="../assets/images/transaction/failed.png"
              alt="failed"
              width="70px"
            />
            <h5 className="nunito-700" style={{ marginTop: "30px" }}>
              Transfer Failed
            </h5>

            <p
              style={{ marginTop: "20px" }}
              className="nunito-400 font-secondary"
            >
              We can’t transfer your money at the moment, we recommend you to
              check your internet connection and try again.
            </p>
          </div>
        )}

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
            marginBottom: "40px",
          }}
        >
          <div>
            <div>
              <span className="nunito-400 font-thrid">Notes</span>
              <h5 className="nunito-600 mt-2">{notes}</h5>
            </div>
          </div>
        </div>

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
              <span className="nunito-400 font-thrid">{noTelp}</span>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-end"
          style={{ marginTop: "95px" }}
        >
          {isSuccess ? (
            <>
              <button>Download PDF</button>
              <Button name="Back to Home" width="170px" />
            </>
          ) : (
            <Button name="Try Again" width="170px" />
          )}
        </div>
      </div>
    </div>
  );
}
