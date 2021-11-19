import MainLayout from "components/layouts/MainLayout";

export default function PersonalInfo() {
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
        Personal Info
      </div>
    </MainLayout>
  );
}
