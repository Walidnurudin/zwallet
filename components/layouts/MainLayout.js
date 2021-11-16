import { Footer, Sidebar, Navbar } from "components/module";
import Head from "next/head";

export default function MainLayout(props) {
  return (
    <>
      <Head>
        <title>zwallet | {props.title}</title>
      </Head>

      <Navbar firsName="Walid" lastName="nurudin" noTelp="0865342" />
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>

          <div className="col-9">{props.children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
