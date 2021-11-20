import React, { useState } from "react";
import Link from "next/link";
import axios from "utils/axios";
import { useRouter } from "next/router";
import AuthLayout from "components/layouts/AuthLayout";
import { Input, Button, ErrorHandling } from "components/module";
import { getDataCookie } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/register", form)
      .then((res) => {
        console.log(res);
        router.push("/login");
      })
      .catch((err) => {
        setIsError({
          status: true,
          msg: err.response.data.msg,
        });

        setTimeout(() => {
          setIsError({
            status: false,
            msg: "",
          });
        }, 3000);
      });
  };

  return (
    <AuthLayout title="Register">
      <div className="register__header">
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
              image="../assets/images/auth/person.png"
              name="firstName"
              type="text"
              placeholder="Enter your firstname"
              top="60px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/person.png"
              name="lastName"
              type="text"
              placeholder="Enter your lastname"
              top="40px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/mail.png"
              name="email"
              type="text"
              placeholder="Enter your e-mail"
              top="40px"
              handleChange={handleChangeText}
            />
            <Input
              image="../assets/images/auth/lock.png"
              name="password"
              type="text"
              placeholder="Create your password"
              isPassword={true}
              top="40px"
              handleChange={handleChangeText}
            />

            <div className="d-flex justify-content-end mt-3">
              <Link href="/reset-password" className="nunito-600">
                Forgot password?
              </Link>
            </div>

            {isError.status && <ErrorHandling msg={isError.msg} top="60px" />}

            <Button
              name="Sign Up"
              top="30px"
              bottom="40px"
              handleClick={handleSubmit}
            />
          </form>

          <p className="text-center font-secondary">
            Already have an account? Let’s
            <Link href="/login"> Login</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
