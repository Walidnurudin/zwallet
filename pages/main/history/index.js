/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MainLayout from "components/layouts/MainLayout";

export default function Transfer() {
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Samuel Suhi",
      status: "Accept",
      nominal: "+Rp50.000",
    },
    {
      id: 2,
      nama: "Suhi Maulina",
      status: "Accept",
      nominal: "+Rp50.000",
    },
    {
      id: 3,
      nama: "Samuel Lukman",
      status: "Accept",
      nominal: "+Rp50.000",
    },
    {
      id: 4,
      nama: "Samuel Eto'o",
      status: "Accept",
      nominal: "+Rp50.000",
    },
    {
      id: 5,
      nama: "Samuel Suhi",
      status: "Accept",
      nominal: "+Rp50.000",
    },
    {
      id: 6,
      nama: "Suhi Maulina",
      status: "Accept",
      nominal: "+Rp50.000",
    },
  ]);

  return (
    <MainLayout title="Transfer">
      <div
        style={{
          marginTop: "40px",
          background: "white",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <div>
          <div className="d-flex justify-content-between mb-5">
            <h5 className="nunito-700">Transaction History</h5>
            <div>filter</div>
          </div>

          <div className="d-flex flex-column gap-5">
            {data.map((item) => (
              <div key={item.id} className="d-flex justify-content-between">
                <div className="d-flex">
                  <img
                    src="../assets/images/landing-page/user1.png"
                    alt="porfile"
                    width="56px"
                  />
                  <div className="ms-3">
                    <h5 className="nunito-600">{item.nama}</h5>
                    <span className="nunito-400 font-thrid">{item.status}</span>
                  </div>
                </div>
                <div className="align-self-center">{item.nominal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
