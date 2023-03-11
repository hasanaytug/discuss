import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import logo from "../../Assets/Lovepik_com-400231006-cartoon-birds.png";

async function Nav() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-between">
      <Link href="/">
        <Image
          className="rounded-full "
          width={72}
          height={72}
          src={logo}
          alt="logo"
        />
      </Link>
      <ul className="flex ">
        {session?.user && <Logged image={session.user?.image || ""} />}
        {!session?.user && <Login />}
      </ul>
    </nav>
  );
}

export default Nav;
