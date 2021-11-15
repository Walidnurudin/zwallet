import React, { useState } from "react";
import Layout from "components/Layout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  await unAuthPage(context); // login, register, forgot password
  return {
    props: {},
  };
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", form)
      .then((res) => {
        console.log(res);
        Cookie.set("token", res.data.data.token);
        Cookie.set("id", res.data.data.id);
        router.push("/main/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="Login">
      <div className="container">
        <h1>Login Page</h1>
        <hr />
        <div className="mt-2">
          <form className="card p-5" onSubmit={handleSubmit}>
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={handleChangeText}
            />
            <label name="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={handleChangeText}
            />
            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
