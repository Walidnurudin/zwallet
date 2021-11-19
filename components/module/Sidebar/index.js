/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { ModalComponent, ModalLogout } from "..";

export default function Sidebar({ handleGetAfterTopup }) {
  const router = useRouter();

  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // MODAL LOGOUT
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

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

  const isActive = (path) => {
    return router.pathname.includes(path);
  };

  return (
    <div className="sidebar__wrapper d-flex justify-content-between flex-column">
      <div className="d-flex flex-column gap-5">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
        >
          {isActive("/main/home") ? (
            <>
              <img
                src="../assets/images/sidebar/grid-active.png"
                alt="img"
                width="28px"
                height="28px"
              />
              <div
                className="align-self-center nunito-700 font-secondary"
                style={{ color: "#6379F4" }}
              >
                Dashboard
              </div>
            </>
          ) : (
            <>
              <img
                src="../assets/images/sidebar/grid.png"
                alt="img"
                width="28px"
                height="28px"
              />
              <div className="align-self-center nunito-400 font-secondary">
                Dashboard
              </div>
            </>
          )}
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTranfer}
        >
          {isActive("/main/transfer") ? (
            <>
              <img
                src="../assets/images/sidebar/arrow-active.png"
                alt="img"
                width="28px"
                height="28px"
              />
              <div
                className="align-self-center nunito-700 font-secondary"
                style={{ color: "#6379F4" }}
              >
                Transfer
              </div>
            </>
          ) : (
            <>
              <img
                src="../assets/images/sidebar/arrow.png"
                alt="img"
                width="28px"
                height="28px"
              />
              <div className="align-self-center nunito-400 font-secondary">
                Transfer
              </div>
            </>
          )}
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
          {isActive("/main/profile") ? (
            <>
              <img
                src="../assets/images/sidebar/user-active.png"
                alt="img"
                width="28px"
                height="28px"
              />
              <div
                className="align-self-center nunito-700 font-secondary"
                style={{ color: "#6379F4" }}
              >
                Profile
              </div>
            </>
          ) : (
            <>
              <img
                src="../assets/images/sidebar/user.png"
                alt="img"
                width="28px"
                height="28px"
              />
              <div className="align-self-center nunito-400 font-secondary">
                Profile
              </div>
            </>
          )}
        </div>
      </div>

      <div className="d-flex">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={() => handleShowLogout()}
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

      {/* MODAL LOGOUT */}
      <ModalLogout
        show={showLogout}
        onHide={handleCloseLogout}
        handleClose={handleCloseLogout}
      />
    </div>
  );
}
