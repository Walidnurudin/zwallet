import React from "react";
import Navbar from "components/module/Navbar";
import Layout from "components/Layout";

function Profile() {
  return (
    <Layout title="profile">
      <Navbar />
      <div>Page Profile</div>
      <h3>{process.env.URL_BACKEND}</h3>
    </Layout>
  );
}

export default Profile;
