import { Container } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const AuthNav = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="px-4 py-3">
        <Link href="/">
          <Image src="/logo.png" width={120} height={60} alt="logo" />
        </Link>
      </Container>
    </header>
  );
};

export default AuthNav;
