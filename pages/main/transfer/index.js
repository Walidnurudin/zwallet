import React, { useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import { Modal } from "react-bootstrap";
import { Button, ModalComponent } from "components/module";
import {
  SearchReceiver,
  ConfirmationTransfer,
  Amount,
} from "components/molecules";

export default function Transfer() {
  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // PIN
  const [pin, setPin] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTextPin = (event) => {
    if (event.target.value) {
      const nextSibling = document.getElementById(
        `pin-${parseInt(event.target.name, 10) + 1}`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }

    setPin({ ...pin, [`pin${event.target.name}`]: event.target.value });
  };

  const handleSubmitPin = () => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;
    handleClose();
    console.log(allPin);
  };

  const [data, setData] = useState([
    {
      id: 1,
      nama: "Samuel Suhi",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
    {
      id: 2,
      nama: "Suhi Maulina",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
    {
      id: 3,
      nama: "Samuel Lukman",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
    {
      id: 4,
      nama: "Samuel Eto'o",
      noTelp: "0767834",
      nominal: "+Rp50.000",
    },
  ]);

  const handleText = (e) => {};

  return (
    <MainLayout title="Transfer">
      {/* <SearchReceiver data={data} /> */}
      {/* <Amount name="Walid nurudin" noTelp="0987324" /> */}
      <ConfirmationTransfer
        name="Walid nurudin"
        noTelp="0987324"
        amount="50.000"
        balance="1.000.000"
        date="May 11, 2020 - 12.20"
        notes="Uang jajan"
        handleSubmit={handleShow}
      />

      <ModalComponent
        show={show}
        onHide={handleClose}
        isPin={true}
        // PIN
        handleTextPin={handleTextPin}
        handleSubmitPin={handleSubmitPin}
      />
    </MainLayout>
  );
}
