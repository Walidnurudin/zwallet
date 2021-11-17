/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      {/* HEADER */}
      <section className="container d-flex justify-content-between">
        <img src="../assets/images/logo/zwallet.png" alt="logo" />

        <div>
          <button className="btn btn-outline-primary">Login</button>
          <button className="btn btn-primary">Sign Up</button>
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
      <section style={{ background: "rgba(71, 58, 209, 0.06)" }}>
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
      <section></section>

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
