import MainLayout from "components/layouts/MainLayout";

export default function ChangePin() {
  return (
    <MainLayout title="Personal Info" firstName="walid" lastName="Nurudin">
      <div
        style={{
          padding: "30px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: "25px",
          marginTop: "40px",
          marginBottom: "40px",
          background: "#ffffff",
        }}
      >
        <h5 className="nunito-700">Change PIN</h5>
        <p
          className="nunito-400 font-secondary"
          style={{
            width: "40%",
            marginTop: "25px",
            marginBottom: "40px",
            lineHeight: "28px",
          }}
        >
          Enter your current 6 digits Zwallet PIN below to continue to the next
          steps.
        </p>
      </div>
    </MainLayout>
  );
}
