/* eslint-disable @next/next/no-img-element */

export default function Navbar(props) {
  return (
    <div className="navbar__wrapper">
      <div className="container d-flex justify-content-between align-items-center">
        <img
          src="../assets/images/logo/zwallet.png"
          alt="logo"
          width="98px"
          height="25px"
        />

        <div className="d-flex gap-4 align-self-center">
          <img
            src="../assets/images/landing-page/user1.png"
            alt="logo"
            width="52px"
            height="52px"
          />
          <div>
            <div className="nunito-700" style={{ fontSize: "18px" }}>
              {props.firstName} {props.lastName}
            </div>
            <div
              className="nunito-400 font-secondary"
              style={{ fontSize: "13px" }}
            >
              {props.noTelp || "-"}
            </div>
          </div>
          <img
            src="../assets/images/transaction/bell.png"
            alt="notification"
            width="24px"
            height="24px"
            className="align-self-center"
          />
        </div>
      </div>
    </div>
  );
}
