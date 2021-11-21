import React, { useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";
import { Modal, Spinner } from "react-bootstrap";
import { Button, ErrorHandling } from "components/module";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // GET USER
  const user = await axios
    .get(`/user/profile/${dataCookie.id}`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return [];
    });

  return {
    props: {
      data: { dataCookie, user },
    },
  };
}

export default function PersonalInfo(props) {
  const [data, setData] = useState(props.data.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [noTelp, setNoTelp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleText = (e) => {
    setNoTelp(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .patch(`/user/profile/${props.data.dataCookie.id}`, { noTelp: noTelp })
      .then((res) => {
        console.log(res);
        // setIsSuccess({
        //   status: true,
        //   msg: res.data.msg,
        // });

        // setTimeout(() => {
        //   setIsSuccess({
        //     status: false,
        //     msg: "",
        //   });
        // }, 3000);
        setIsLoading(false);
        handleClose();

        axios
          .get(`/user/profile/${props.data.dataCookie.id}`)
          .then((res) => {
            console.log(res.data.data);
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        setIsError({
          status: true,
          msg: err.response.data.msg,
        });

        setTimeout(() => {
          setIsError({
            status: false,
            msg: "",
          });
        }, 3000);
        setIsLoading(false);
        setIsLoading(false);
        console.log(err.response);
      });
  };

  // // GET USER
  // const getUser = () => {
  //   axios
  //     .get(`/user/profile/${props.dataCookie.id}`)
  //     .then((res) => {
  //       console.log(res.data.data)
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };

  return (
    <MainLayout
      title="Personal Info"
      firstName={data.firstName}
      lastName={data.lastName}
      noTelp={data.noTelp}
      image={data.image}
    >
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
        <h5 className="nunito-700">Personal Info</h5>
        <p
          className="nunito-400 font-secondary"
          style={{
            width: "40%",
            marginTop: "25px",
            marginBottom: "40px",
            lineHeight: "28px",
          }}
        >
          We got your personal information from the sign up proccess. If you
          want to make changes on your information, contact our support.
        </p>

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
              <span className="nunito-400 font-thrid">First Name</span>
              <h5 className="nunito-600 mt-2">{data.firstName}</h5>
            </div>
          </div>
        </div>

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
              <span className="nunito-400 font-thrid">Last Name</span>
              <h5 className="nunito-600 mt-2">{data.lastName}</h5>
            </div>
          </div>
        </div>

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
              <span className="nunito-400 font-thrid">Verified E-mail</span>
              <h5 className="nunito-600 mt-2 font-secondary">{data.email}</h5>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between"
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
              <span className="nunito-400 font-thrid">Phone Number</span>
              <h5 className="nunito-600 mt-2">{data.noTelp || "-"}</h5>
            </div>
          </div>
          <div
            className="align-self-center nunito-400 font-primary"
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          >
            Manage
          </div>
        </div>
      </div>

      {/* UPDATE HO TELP */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="nunito-400 font-secondary">
            Enter phone number to update your profile
          </p>
          <input
            type="number"
            name="noTelp"
            placeholder="Input Phone Number ..."
            onChange={handleText}
            className="nunito-700 font-primary"
            style={{
              height: "70px",
              width: "100%",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "40px",
              marginBottom: "50px",
              border: "1px solid rgba(169, 169, 169, 0.6)",
              borderRadius: "10px",
              outline: "none",
            }}
          />

          {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
          {isSuccess.status && (
            <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
          )}
        </Modal.Body>
        <Modal.Footer>
          {isLoading ? (
            <Button width="170px">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button name="Submit" width="170px" handleClick={handleSubmit} />
          )}
        </Modal.Footer>
      </Modal>
    </MainLayout>
  );
}
