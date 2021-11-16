/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Sidebar() {
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/home");
  };

  const handleTranfer = () => {
    router.push("/transfer");
  };

  const handleTopup = () => {
    alert("Topup");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    alert("Logout");
    Cookie.remove("token");
    Cookie.remove("id");
    router.push("/login");
  };

  return (
    <div className="sidebar__wrapper d-flex justify-content-between flex-column">
      <div className="d-flex flex-column gap-5">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
        >
          <img
            src="../assets/images/sidebar/grid.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Dashboard
          </div>
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTranfer}
        >
          <img
            src="../assets/images/sidebar/arrow.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Tranfer
          </div>
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleTopup}
        >
          <img
            src="../assets/images/sidebar/plus.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Top Up
          </div>
        </div>
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleProfile}
        >
          <img
            src="../assets/images/sidebar/user.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Profile
          </div>
        </div>
      </div>

      <div className="d-flex">
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <img
            src="../assets/images/sidebar/logout.png"
            alt="img"
            width="28px"
            height="28px"
          />
          <div className="align-self-center nunito-400 font-secondary">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
