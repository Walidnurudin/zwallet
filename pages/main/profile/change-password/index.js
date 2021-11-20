import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import { Input, Button } from "components/module";
import axios from "utils/axios";

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

export default function ChangePassword(props) {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userData, setUserData] = useState({});

  // GET USER
  const getUser = () => {
    axios
      .get(`/user/profile/${props.data.dataCookie.id}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleText = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .patch(`/user/password/${props.data.dataCookie.id}`, password)
      .then((res) => {
        console.log(res);
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MainLayout title="Personal Info" firstName="walid" lastName="Nurudin">
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
        <h5 className="nunito-700">Change Password</h5>
        <p
          className="nunito-400 font-secondary"
          style={{
            width: "40%",
            marginTop: "25px",
            marginBottom: "40px",
            lineHeight: "28px",
          }}
        >
          You must enter your current password and then type your new password
          twice.
        </p>

        <div className="d-flex justify-content-center">
          <Input
            isPassword={true}
            value={password.oldPassword}
            image="../assets/images/auth/lock.png"
            placeholder="Current password"
            widthWrap="431px"
            name="oldPassword"
            handleChange={handleText}
          />
        </div>

        <div className="d-flex justify-content-center mt-5">
          <Input
            isPassword={true}
            value={password.newPassword}
            image="../assets/images/auth/lock.png"
            placeholder="New password"
            widthWrap="431px"
            name="newPassword"
            handleChange={handleText}
          />
        </div>

        <div className="d-flex justify-content-center mt-5">
          <Input
            isPassword={true}
            value={password.confirmPassword}
            image="../assets/images/auth/lock.png"
            placeholder="Repeat new password"
            widthWrap="431px"
            name="confirmPassword"
            handleChange={handleText}
          />
        </div>

        <div className="d-flex justify-content-center">
          <Button
            name="Change Password"
            handleClick={handleSubmit}
            width="432px"
            top="70px"
          />
        </div>
      </div>
    </MainLayout>
  );
}
