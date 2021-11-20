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

  console.log(dataCookie.token);

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
      console.log(err.response);
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
      console.log(err.response);
      return [];
    });

  return {
    props: {
      data: { dataCookie, dashboard, history },
    },
  };
}

function Home(props) {
  const [data, setData] = useState(props.data);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUser();
  }, []);

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

  console.log(data);
  return (
    <MainLayout
      title="Home"
      firstName={userData.firstName}
      lastName={userData.lastName}
      noTelp={userData.noTelp}
      image={userData.image}
    >
      <Balance balance={userData.balance} noTelp={userData.noTelp} />
      <div className="row">
        <div className="col-7">
          <Dashboard
            income={data.dashboard.totalIncome}
            expense={data.dashboard.totalExpense}
          />
        </div>
        <div className="col-5">
          <TransactionHistory data={data.history} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
