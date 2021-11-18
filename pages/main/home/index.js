import React, { useState, useEffect } from "react";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";
import MainLayout from "components/layouts/MainLayout";
import { Balance, Dashboard, TransactionHistory } from "components/molecules";

// SERVER SIDE RENDERING
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

  // GET DASHBOARD
  const dashboard = await axios
    .get(`/dashboard/${dataCookie.id}`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return [];
    });

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
      console.log(err.response.data);
      return [];
    });

  // GET HISTORY
  const history = await axios
    .get(`/transaction/history?page=1&limit=3&filter=WEEK`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      return [];
    });

  return {
    props: {
      data: { user, dashboard, history },
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

  console.log(data);
  return (
    <MainLayout
      title="Home"
      firstName={data.user.firstName}
      lastName={data.user.lastName}
      noTelp={data.user.noTelp}
    >
      <Balance balance={data.user.balance} noTelp={data.user.noTelp} />
      <div className="row">
        <div className="col-7">
          <Dashboard
            income={data.dashboard.totalIncome}
            expense={data.dashboard.totalExpense}
          />
        </div>
        <div className="col-5">
          <TransactionHistory />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
