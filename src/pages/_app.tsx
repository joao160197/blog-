import type { AppProps } from "next/app";
import "../styles/globalstyles.scss";
import { Header } from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return(
  <>
    <Header /> 
    <Component {...pageProps} />
  </>
  )
}
