/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {/* HEADER */}
      <section className="container d-flex justify-content-between">
        <img src="../assets/images/logo/zwallet.png" alt="logo" />

        <div>
          {Cookie.get("token") ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/home")}
              >
                Dashboard
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-primary"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </section>

      {/* HERO */}
      <section className="container d-flex">
        <img
          src="../assets/images/landing-page/hero.png"
          alt="hero"
          width="460px"
        />

        <div>
          <div>
            <p>Awesome App</p>
            <p>
              For Saving <span>Time.</span>
            </p>
          </div>

          <div>
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </div>

          <button className="btn btn-primary">Try It Free</button>

          <p>Available on</p>

          <div>
            <img
              src="../assets/images/landing-page/playstore.png"
              alt="playstore"
            />
            <img
              src="../assets/images/landing-page/appstore.png"
              alt="appstore"
            />
          </div>
        </div>
      </section>

      {/* STARTUP */}
      <section
        style={{ background: "rgba(71, 58, 209, 0.06)", padding: "90px 0px" }}
      >
        <div className="container d-flex justify-content-between">
          <img
            src="../assets/images/landing-page/microsoft.png"
            alt="microsoft"
            width="173px"
          />
          <img
            src="../assets/images/landing-page/dropbox.png"
            alt="dropbox"
            width="173px"
          />
          <img
            src="../assets/images/landing-page/hm.png"
            alt="hm"
            width="173px"
          />
          <img
            src="../assets/images/landing-page/airbnb.png"
            alt="airbnb"
            width="173px"
          />
          <img
            src="../assets/images/landing-page/canon.png"
            alt="canon"
            width="173px"
          />
          <img
            src="../assets/images/landing-page/dell.png"
            alt="dell"
            width="173px"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="container text-center">
        <h1 className="nunito-700">
          <span className="font-primary">About</span> the Application.
        </h1>

        <p>
          We have some great features from the application and it’s totally free
          to use by all users around the world.
        </p>

        <div className="d-flex">
          <div>
            <img
              src="../assets/images/landing-page/phone.png"
              alt="phone"
              width="60px"
            />
            <h5>24/7 Support</h5>
            <p>
              We have 24/7 contact support so you can contact us whenever you
              want and we will respond it.
            </p>
          </div>

          <div>
            <img
              src="../assets/images/landing-page/phone.png"
              alt="phone"
              width="60px"
            />
            <h5>24/7 Support</h5>
            <p>
              We have 24/7 contact support so you can contact us whenever you
              want and we will respond it.
            </p>
          </div>

          <div>
            <img
              src="../assets/images/landing-page/phone.png"
              alt="phone"
              width="60px"
            />
            <h5>24/7 Support</h5>
            <p>
              We have 24/7 contact support so you can contact us whenever you
              want and we will respond it.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "rgba(71, 58, 209, 0.06)" }}>
        <div className="container d-flex">
          <img
            src="../assets/images/landing-page/feature.png"
            alt="image"
            width="450px"
          />

          <div>
            <h1>All The Great Zwallet Features.</h1>

            <div>
              <h5>1. Small Fee</h5>
              <p>
                We only charge 5% of every success transaction done in Zwallet
                app.
              </p>
            </div>

            <div>
              <h5>2. Small Fee</h5>
              <p>
                We only charge 5% of every success transaction done in Zwallet
                app.
              </p>
            </div>

            <div>
              <h5>3. Small Fee</h5>
              <p>
                We only charge 5% of every success transaction done in Zwallet
                app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENT */}
      <section className="container">
        <h1>What Users are Saying.</h1>
        <p>
          We have some great features from the application and it’s totally free
          to use by all users around the world.
        </p>

        <div className="d-flex">
          <div>
            <h5>Sherina Chaw</h5>
            <p>
              “I use this app since 2 years ago and this is the best app that
              I’ve ever use in my entire life”
            </p>
          </div>

          <div>
            <h5>Sherina Chaw</h5>
            <p>
              “I use this app since 2 years ago and this is the best app that
              I’ve ever use in my entire life”
            </p>
          </div>

          <div>
            <h5>Sherina Chaw</h5>
            <p>
              “I use this app since 2 years ago and this is the best app that
              I’ve ever use in my entire life”
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section style={{ background: "#6379F4" }}>
        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <img src="../assets/images/logo/zwallet2.png" alt="logo" />
              <p>
                Simplify financial needs and saving much time in banking needs
                with one single app.
              </p>
            </div>

            <div></div>
          </div>

          <hr />

          <div className="d-flex justify-content-between">
            <p>2020 Zwallet. All right reserved.</p>

            <div>
              <p>+62 5637 8882 9901</p>
              <p>contact@zwallet.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
