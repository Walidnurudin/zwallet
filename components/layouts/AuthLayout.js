import Head from "next/head";
import Image from "next/image";
import { background, zwallet2, auth } from "public/assets/images";
import Footer from "components/module/Footer";
import Navbar from "components/module/Navbar";

export default function AuthLayout(props) {
  return (
    <>
      <Head>
        <title>Auth | {props.title}</title>
      </Head>

      <Navbar />

      <div className="row p-0">
        <div className="col-0 col-md-7 d-none d-md-block p-0">
          <div className="layout__overlay">
            <Image src={zwallet2} alt="logo" />
            <Image src={auth} alt="logo" />

            <h5 className="text-white nunito-700">
              App that Covering Banking Needs.
            </h5>

            <p
              className="text-white nunito-400"
              style={{ lineHeight: "23px", fontSize: "16PX" }}
            >
              Zwallet is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Zwallet everyday with worldwide
              users coverage.
            </p>
            {/* </div> */}
          </div>
        </div>

        <div className="col-12 col-md-5 p-0">{props.children}</div>
      </div>

      <Footer />
    </>
  );
}
