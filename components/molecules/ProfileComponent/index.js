/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";

function ProfileComponent() {
  const router = useRouter();
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
      <div
        className="text-center"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <img
          src="../assets/images/landing-page/user1.png"
          alt="user"
          width="80px"
        />

        <div style={{ marginTop: "10px" }}>
          <img
            src="../assets/images/transaction/edit-profile.png"
            alt="user"
            width="11px"
          />

          <span className="nunito-400 font-secondary ms-2">Edit</span>
        </div>

        <div style={{ marginTop: "15px", marginBottom: "50px" }}>
          <h5 className="nunito-700">Robert Chandler</h5>
          <p className="nunito-400 font-secondary">+62 813-9387-7946</p>
        </div>

        <div className="d-flex justify-content-center align-items-center flex-column">
          <div
            style={{
              padding: "18px 20px",
              width: "433px",
              background: "#E5E8ED",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            className="d-flex justify-content-between align-items-center"
            onClick={() => router.push("/personal-info")}
          >
            <p className="nunito-700 m-0">Personal Information</p>
            <img
              src="../assets/images/transaction/arrow-right.png"
              alt="user"
              width="28px"
              height="28px"
            />
          </div>

          <div
            style={{
              padding: "18px 20px",
              width: "433px",
              background: "#E5E8ED",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            className="d-flex justify-content-between align-items-center"
            onClick={() => router.push("/change-password")}
          >
            <p className="nunito-700 m-0">Change Password</p>
            <img
              src="../assets/images/transaction/arrow-right.png"
              alt="user"
              width="28px"
              height="28px"
            />
          </div>

          <div
            style={{
              padding: "18px 20px",
              width: "433px",
              background: "#E5E8ED",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            className="d-flex justify-content-between align-items-center"
            onClick={() => router.push("/change-pin")}
          >
            <p className="nunito-700 m-0">Change PIN</p>
            <img
              src="../assets/images/transaction/arrow-right.png"
              alt="user"
              width="28px"
              height="28px"
            />
          </div>

          <div
            style={{
              padding: "18px 20px",
              width: "433px",
              background: "#E5E8ED",
              borderRadius: "10px",
              cursor: "pointer",
              marginTop: "20px",
            }}
            className="d-flex justify-content-between align-items-center"
            onClick={() => alert("Logout")}
          >
            <p className="nunito-700 m-0">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
