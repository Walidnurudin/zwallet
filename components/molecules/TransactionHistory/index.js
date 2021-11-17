/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";

function TransactionHistory() {
  const router = useRouter();
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
  ]);

  const handleHistory = () => {
    router.push("/history");
  };

  return (
    <div
      style={{
        padding: "30px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        borderRadius: "25px",
        marginTop: "20px",
        marginBottom: "40px",
        background: "#ffffff",
      }}
    >
      <div>
        <div className="d-flex justify-content-between mb-5">
          <h5 className="nunito-700">Transaction History</h5>
          <span
            className="nunito-400 font-primary"
            style={{ cursor: "pointer" }}
            onClick={handleHistory}
          >
            See all
          </span>
        </div>

        <div className="d-flex flex-column gap-4 ">
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
  );
}

export default TransactionHistory;
