import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/styles.css";
import "@/styles/queries.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}
