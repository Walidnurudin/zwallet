import { Footer, Sidebar, Navbar } from "components/module";
import Head from "next/head";

export default function MainLayout(props) {
  return (
    <>
      <Head>
        <title>zwallet | {props.title}</title>
      </Head>

      <Navbar
        firstName={props.firstName}
        lastName={props.lastName}
        noTelp={props.noTelp}
      />
      <div style={{ background: "rgba(99, 121, 244, 0.05)" }}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Sidebar
              // handleGetAfterTopup={props.handleGetAfterTopup}
              />
            </div>

            <div className="col-9">{props.children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
