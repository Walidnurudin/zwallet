import React from "react";
import { Button } from "..";
import { Modal } from "react-bootstrap";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "utils/axios";

function ModalLogout({ show, onHide, handleClose }) {
  const router = useRouter();

  const handleLogout = () => {
    axios
      .post(`/auth/logout`)
      .then((res) => {
        console.log(res);
        Cookie.remove("token");
        Cookie.remove("id");
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title className="nunito-600">
            Are you sure want to logout?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="d-flex gap-3">
            <Button
              name="Cancel"
              width="100px"
              color="#7A7886"
              handleClick={handleClose}
            />
            <Button
              name="Logout"
              width="100px"
              color="#FF5B37"
              handleClick={handleLogout}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalLogout;
