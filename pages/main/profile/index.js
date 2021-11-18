import MainLayout from "components/layouts/MainLayout";
import { ProfileComponent } from "components/molecules";

export default function Transfer() {
  return (
    <MainLayout title="Profile" firstName="walid" lastName="Nurudin">
      <ProfileComponent />
    </MainLayout>
  );
}
