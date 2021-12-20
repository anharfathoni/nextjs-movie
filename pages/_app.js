import "antd/dist/antd.css";
import "styles/main.scss";
import '../i18n';
import Navbar from "components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "10vh" }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
