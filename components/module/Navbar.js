import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { zwallet, user1 } from "public/assets/images";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");
  };
  return (
    <div style={{ padding: "50px 150px" }}>
      <div className="container d-flex justify-content-between">
        <Image src={zwallet} alt="logo" />

        <div>
          <Image src={user1} alt="logo" />
          <div>
            <div>Robert Chandler</div>
            <div>+62 8139 3877 7946</div>
          </div>
        </div>
      </div>
    </div>
  );
}
