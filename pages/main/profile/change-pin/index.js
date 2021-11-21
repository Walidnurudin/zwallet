import React, { useEffect, useState } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import { Button, ErrorHandling } from "components/module";
import axios from "utils/axios";
import { Spinner } from "react-bootstrap";

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

  return {
    props: {
      data: { dataCookie },
    },
  };
}

export default function ChangePin(props) {
  const [pin, setPin] = useState({});
  const [userData, setUserData] = useState({});

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const addPin = (event) => {
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

  const handleSubmit = (e) => {
    const allPin =
      pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6;

    e.preventDefault();

    console.log("SUBMIT PIN");

    setIsLoading(true);
    axios
      .patch(`/user/pin/${props.data.dataCookie.id}`, { pin: allPin })
      .then((res) => {
        setIsSuccess({
          status: true,
          msg: res.data.msg,
        });

        setTimeout(() => {
          setIsSuccess({
            status: false,
            msg: "",
          });
        }, 3000);
        setIsLoading(false);
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
      });
  };

  const getUser = () => {
    axios
      .get(`/user/profile/${props.data.dataCookie.id}`)
      .then((res) => {
        console.log(res);
        setUserData(res.data.data);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MainLayout
      title="Change PIN"
      firstName={userData.firstName}
      lastName={userData.lastName}
      noTelp={userData.noTelp}
      image={userData.image}
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
        <h5 className="nunito-700">Change PIN</h5>
        <p
          className="nunito-400 font-secondary"
          style={{
            width: "40%",
            marginTop: "25px",
            marginBottom: "40px",
            lineHeight: "28px",
          }}
        >
          Enter your current 6 digits Zwallet PIN below to continue to the next
          steps.
        </p>

        <div style={{ marginTop: "50px" }}>
          <div>
            <div className="d-flex gap-3 justify-content-center">
              <div className="">
                <input
                  style={{
                    width: "50px",
                    height: "65px",
                    borderRadius: "10px",
                    border: "1px solid #6379F4",
                    outline: "none",
                    padding: "12px 18px",
                  }}
                  maxLength="1"
                  onChange={(event) => addPin(event)}
                  name="1"
                  id="pin-1"
                />
              </div>
              <div className="">
                <input
                  style={{
                    width: "50px",
                    height: "65px",
                    borderRadius: "10px",
                    border: "1px solid #6379F4",
                    outline: "none",
                    padding: "12px 18px",
                  }}
                  maxLength="1"
                  onChange={(event) => addPin(event)}
                  name="2"
                  id="pin-2"
                />
              </div>
              <div className="">
                <input
                  style={{
                    width: "50px",
                    height: "65px",
                    borderRadius: "10px",
                    border: "1px solid #6379F4",
                    outline: "none",
                    padding: "12px 18px",
                  }}
                  maxLength="1"
                  onChange={(event) => addPin(event)}
                  name="3"
                  id="pin-3"
                />
              </div>
              <div className="">
                <input
                  style={{
                    width: "50px",
                    height: "65px",
                    borderRadius: "10px",
                    border: "1px solid #6379F4",
                    outline: "none",
                    padding: "12px 18px",
                  }}
                  maxLength="1"
                  onChange={(event) => addPin(event)}
                  name="4"
                  id="pin-4"
                />
              </div>
              <div className="">
                <input
                  style={{
                    width: "50px",
                    height: "65px",
                    borderRadius: "10px",
                    border: "1px solid #6379F4",
                    outline: "none",
                    padding: "12px 18px",
                  }}
                  maxLength="1"
                  onChange={(event) => addPin(event)}
                  name="5"
                  id="pin-5"
                />
              </div>
              <div className="">
                <input
                  style={{
                    width: "50px",
                    height: "65px",
                    borderRadius: "10px",
                    border: "1px solid #6379F4",
                    outline: "none",
                    padding: "12px 18px",
                  }}
                  maxLength="1"
                  onChange={(event) => addPin(event)}
                  name="6"
                  id="pin-6"
                />
              </div>
            </div>
          </div>
        </div>

        {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
        {isSuccess.status && (
          <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
        )}

        <div className="text-center">
          {isLoading ? (
            <Button top="90px" width="432px">
              <Spinner animation="border" variant="light" />
            </Button>
          ) : (
            <Button
              name="Continue"
              top="90px"
              handleClick={handleSubmit}
              width="432px"
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
