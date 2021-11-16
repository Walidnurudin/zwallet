import React, { useState } from "react";
import Link from "next/link";
import axios from "utils/axios";
import AuthLayout from "components/layouts/AuthLayout";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authorizationPage";
import { Input, Button } from "components/module";

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
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthLayout title="Login">
      <div className="login__header">
        <h1 className="font-black nunito-700" style={{ marginBottom: "30px" }}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className="nunito-400 font-secondary">
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>

        <div className="mt-2">
          <form>
            <Input
              image="../assets/images/auth/mail.png"
              name="email"
              type="text"
              placeholder="Enter your e-mail"
              top="60px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/mail.png"
              name="password"
              type="text"
              placeholder="Enter your password"
              isPassword={true}
              top="70px"
              handleChange={handleChangeText}
            />

            <div className="d-flex justify-content-end mt-3">
              <Link href="/reset-password" className="nunito-600">
                Forgot password?
              </Link>
            </div>

            <Button
              name="Login"
              top="90px"
              bottom="40px"
              handleClick={handleSubmit}
            />
          </form>

          <p className="text-center font-secondary">
            Don’t have an account? Let’s
            <Link href="/register"> Sign Up</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
