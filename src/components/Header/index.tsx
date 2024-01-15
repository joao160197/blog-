import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";
// import { ActiveLink } from "../ActiveLink";


export function Header() {
    const router = useRouter();
    const {pathname} = router;
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          <Image alt="logo"  src={logo} />
        </a>
        <nav>
          <Link href="/"><p className={pathname === '/' ? 'active': ''}>Home</p></Link>
          <Link href="/posts"><p className={pathname === '/posts' ? 'active': ''}>Conteúdo</p></Link>
          <Link href="/about"><p className={pathname === '/about' ? 'active': ''}>Sobre</p></Link>
        </nav>
        <a className={styles.ButtonHeader} href="https://www.youtube.com" type="button">Começar</a>
      </div>
    </header>
  );
}
