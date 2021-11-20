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

export default function ResetPasswordFrom() {
  const router = useRouter();
  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    axios
      .patch("/auth/reset-password", {
        keysChangePassword: router.query.id,
        ...form,
      })
      .then((res) => {
        setIsSuccess({
          status: true,
          msg: res.data.msg,
        });

        setTimeout(() => {
          setIsSuccess({
            status: false,
            msg: "",
          });
        }, 3000);
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
    <AuthLayout title="Reset Password">
      <div className="reset__password__header">
        <h1 className="font-black nunito-700" style={{ marginBottom: "30px" }}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h1>
        <p className="nunito-400 font-secondary">
          Now you can create a new password for your Zwallet account. Type your
          password twice so we can confirm your new passsword.
        </p>

        <div className="mt-2">
          <form>
            <Input
              image="../assets/images/auth/lock.png"
              name="newPassword"
              type="text"
              isPassword={true}
              placeholder="Create new password"
              top="60px"
              handleChange={handleChangeText}
            />

            <Input
              image="../assets/images/auth/lock.png"
              name="confirmPassword"
              type="text"
              isPassword={true}
              placeholder="Create new password"
              top="60px"
              handleChange={handleChangeText}
            />

            {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
            {isSuccess.status && (
              <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
            )}

            <Button
              name="confirm"
              top="90px"
              bottom="40px"
              handleClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
