import react from "react";

export default function Footer() {
  return (
    <div className="color-primary">
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "20px 0px", color: "white" }}
      >
        <div className="nunito-400">2020 Zwallet. All right reserved.</div>
        <div className="d-flex justify-content-between">
          <div className="nunito-400" style={{ marginRight: "40px" }}>
            +62 5637 8882 9901
          </div>
          <div className="nunito-400">contact@zwallet.com</div>
        </div>
      </div>
    </div>
  );
}
