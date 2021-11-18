import React, { useState, useEffect } from "react";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import MainLayout from "components/layouts/MainLayout";
import { Balance, Dashboard, TransactionHistory } from "components/molecules";

// SERVER SIDE RENDERING
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  console.log("DATA COOKIE", dataCookie);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await axios
    .get("/user?page=1&limit=2&search=&sort=", {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: {
      data: res,
    },
  };
}

function Home(props) {
  const [data, setData] = useState(props.data);
  // CLIENT SIDE RENDERING

  // useEffect(() => {
  //   getDataUser();
  // }, []);

  // const getDataUser = () => {
  //   axios
  //     .get("/user?page=1&limit=2&search=&sort=")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // ==================

  console.log(props);

  return (
    <MainLayout title="Home">
      <Balance balance="120.000" noTelp="08321" />
      <div className="row">
        <div className="col-7">
          <Dashboard incoming="2.200.000" expense="1.500.00" />
        </div>
        <div className="col-5">
          <TransactionHistory />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
