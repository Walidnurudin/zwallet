import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";
import axios from "utils/axios";
import { getDataCookie } from "middleware/authorizationPage";

// SERVER SIDE RENDERING
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
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
    <Layout title="Home">
      <Navbar />
      <h1 className="font-primary">Home Page</h1>
      <p className="font-secondary">lorem ipsum</p>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.firstName}</h3>
        </div>
      ))}
    </Layout>
  );
}

export default Home;