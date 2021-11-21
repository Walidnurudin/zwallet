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

  let labelChart = [];
  data.dashboard.listIncome.map((item) => {
    labelChart.push(item.day);
  });

  let dataChart = [];
  data.dashboard.listIncome.map((item) => {
    dataChart.push(item.total);
  });

  let dataChartExpense = [];
  data.dashboard.listExpense.map((item) => {
    dataChartExpense.push(item.total);
  });

  // DASHBOARD
  const [dataDashboard, setDataDashboard] = useState({
    labels: labelChart,
    datasets: [
      {
        label: "# of Income",
        data: dataChart,
        fill: false,
        backgroundColor: "#1EC15F",
        borderColor: "#1EC15F",
        yAxisID: "y-axis-1",
      },
      {
        label: "# of Expense",
        data: dataChartExpense,
        fill: false,
        backgroundColor: "#FF5B37",
        borderColor: "#FF5B37",
        yAxisID: "y-axis-2",
      },
    ],
  });

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

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
            // data
            data={dataDashboard}
            options={options}
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
