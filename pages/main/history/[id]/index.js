/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import MainLayout from "components/layouts/MainLayout";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";
import { useRouter } from "next/router";
import { Button } from "components/module";

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

export default function HistoryDetail(props) {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [data, setData] = useState(props.data.user);

  // // GET USER
  const getHistoryById = () => {
    axios
      .get(`/transaction/history/${router.query.id}`)
      .then((res) => {
        console.log(res.data.data);
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getHistoryById();
  }, []);

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
        <h5 className="nunito-700">Detail History</h5>

        {history.length > 0 ? (
          <div
            className="text-center"
            style={{
              paddingTop: "50px",
              paddingBottom: "20px",
            }}
          >
            <img
              src={
                history[0].image
                  ? `http://localhost:3001/uploads/${history[0].image}`
                  : "../assets/images/landing-page/user1.png"
              }
              alt="user"
              width="80px"
              height="80px"
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />

            <h5 className="nunito-700 mt-4">
              {history[0].firstName} {history[0].lastName}
            </h5>

            <p className="nunit-400 font-secondary">
              {router.query.type} - {history[0].status}
            </p>

            <h1 className="nunito-700 font-primary">Rp{history[0].amount}</h1>

            <Button
              name="Back"
              handleClick={() => router.push("/history")}
              width="200px"
              top="20px"
            />
          </div>
        ) : (
          <>
            <h1 className="text-center font-secondary nunito-700">
              no transaction
            </h1>
          </>
        )}
      </div>
    </MainLayout>
  );
}
