/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

function SearchReceiver({ data }) {
  return (
    <div
      style={{
        padding: "30px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "25px",
        marginTop: "40px",
        background: "#ffffff",
      }}
    >
      <div>
        <h5 className="nunito-700">Search Receiver</h5>

        <div style={{ position: "relative" }}>
          <img
            src="../assets/images/transaction/search.png"
            alt="icon"
            width="24px"
            style={{ position: "absolute", left: "20px", top: "40px" }}
          />
          <input
            className="nunito-400 font-secondary"
            type="text"
            placeholder="Search receiver here"
            style={{
              marginTop: "25px",
              marginBottom: "30px",
              width: "100%",
              padding: "16px 54px",
              borderRadius: "12px",
              background: "rgba(58, 61, 66, 0.1)",
              outline: "none",
              border: "none",
            }}
          />
        </div>

        <div className="d-flex flex-column gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="d-flex"
              style={{
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div className="d-flex">
                <img
                  src="../assets/images/landing-page/user1.png"
                  alt="porfile"
                  width="56px"
                />
                <div className="ms-3">
                  <h5 className="nunito-600">{item.nama}</h5>
                  <span className="nunito-400 font-thrid">{item.noTelp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchReceiver;
