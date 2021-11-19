import MainLayout from "components/layouts/MainLayout";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";

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

export default function Transfer(props) {
  const router = useRouter();
  const inputFile = useRef(null);

  const [image, setImage] = useState({ image: "" });
  const [dataUser, setDataUser] = useState({});

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const updateImage = () => {
    if (image === null || !image.image) {
      // notifError("Masukan gambar");
    } else {
      const formData = new FormData();
      for (const data in image) {
        formData.append(data, image[data]);
      }

      // UNTUK MENGECEK DATA DI DALAM FORMDATA
      for (const data of formData.entries()) {
        // [
        //   [property, value],
        //   [],
        // ]
        console.log(data[0] + ", " + data[1]);
      }

      axios
        .patch(`/user/image/${props.data.dataCookie.id}`, formData)
        .then((res) => {
          console.log(res);
          axios
            .get(`/user/profile/${props.data.dataCookie.id}`)
            .then((res) => {
              console.log(res);
              setDataUser(res.data.data);
              console.log(dataUser);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getUser = () => {
    axios
      .get(`/user/profile/${props.data.dataCookie.id}`)
      .then((res) => {
        console.log(res);
        setDataUser(res.data.data);
        console.log(dataUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    updateImage();
  }, [image]);

  return (
    <MainLayout
      title="Profile"
      firstName={dataUser.firstName}
      lastName={dataUser.lastName}
      noTelp={dataUser.noTelp}
      image={
        dataUser.image
          ? `http://localhost:3001/uploads/${dataUser.image}`
          : "../assets/images/landing-page/user1.png"
      }
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
        <div
          className="text-center"
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <img
            src={
              dataUser.image
                ? `http://localhost:3001/uploads/${dataUser.image}`
                : "../assets/images/landing-page/user1.png"
            }
            alt="user"
            width="80px"
            height="80px"
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />

          {/* INPUT IMAGE */}
          <div
            style={{ marginTop: "10px", cursor: "pointer" }}
            onClick={onButtonClick}
          >
            <img
              src="../assets/images/transaction/edit-profile.png"
              alt="user"
              width="11px"
            />

            <span className="nunito-400 font-secondary ms-2">Edit</span>
          </div>

          <input
            type="file"
            id="file"
            name="image"
            onChange={(e) =>
              setImage({
                image: e.target.files[0],
              })
            }
            ref={inputFile}
            style={{ display: "none" }}
          />

          <div style={{ marginTop: "15px", marginBottom: "50px" }}>
            <h5 className="nunito-700">
              {dataUser.firstName} {dataUser.lastName}
            </h5>
            <p className="nunito-400 font-secondary">
              {dataUser.noTelp || "-"}
            </p>
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
              onClick={() => router.push("/profile/personal-info")}
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
              onClick={() => router.push("/profile/change-password")}
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
              onClick={() => router.push("/profile/change-pin")}
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
    </MainLayout>
  );
}
