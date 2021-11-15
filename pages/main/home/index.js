import React, { useState, useEffect } from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";
import axios from "utils/axios";
import { authPage } from "middleware/authorizationPage";

// SERVER SIDE RENDERING
export async function getServerSideProps(context) {
  console.log("HELLO FROM SERVER ...");
  const dataCookie = await authPage(context);
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
      <div>Home Page</div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.firstName}</h3>
        </div>
      ))}
    </Layout>
  );
}

export default Home;
