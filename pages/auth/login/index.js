import React, { useState } from "react";
import AuthLayout from "components/layouts/AuthLayout";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/main/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
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
    <AuthLayout title="Login">
      <div className="container">
        <h1 className="font-black nunito-700">
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p>
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <div className="mt-2">
          <form className="p-5" onSubmit={handleSubmit}>
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

          <p>
            Don’t have an account? Let’s
            <Link href="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
