/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import Cookie from "js-cookie";
import { ModalComponent } from "..";

export default function Sidebar({ handleGetAfterTopup }) {
  const router = useRouter();

  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // TOP UP
  const [data, setData] = useState("");

  const handleTextTopup = (e) => {
    setData(e.target.value);
  };

  const handleSubmitTopup = () => {
    axios
      .post(`/transaction/top-up`, { amount: data })
      .then((res) => {
        console.log(res.data);
        router.push(res.data.data.redirectUrl);
        handleClose();
        // handleGetAfterTopup();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // SIDEBAR
  const handleDashboard = () => {
    router.push("/home");
  };

  const handleTranfer = () => {
    router.push("/transfer");
  };

  const handleTopup = () => {
    handleShow();
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    alert("Logout");
    Cookie.remove("token");
    Cookie.remove("id");
    router.push("/login");
  };

  return (
    <div className="sidebar__wrapper d-flex justify-content-between flex-column">
      <div className="d-flex flex-column gap-5">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
        >
          <img
            src="../assets/images/sidebar/grid.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Dashboard
          </div>
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTranfer}
        >
          <img
            src="../assets/images/sidebar/arrow.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Transfer
          </div>
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTopup}
        >
          <img
            src="../assets/images/sidebar/plus.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Top Up
          </div>
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleProfile}
        >
          <img
            src="../assets/images/sidebar/user.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Profile
          </div>
        </div>
      </div>

      <div className="d-flex">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <img
            src="../assets/images/sidebar/logout.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Logout
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ModalComponent
        show={show}
        onHide={handleClose}
        isPin={false}
        handleTextTopup={handleTextTopup}
        handleSubmitTopup={handleSubmitTopup}
      />
    </div>
  );
}
