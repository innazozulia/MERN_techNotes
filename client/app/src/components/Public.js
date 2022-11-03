import { Link } from "react-router-dom";
import { VscGear } from "react-icons/vsc";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to techNots!</h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, techNots Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          <p>
            techNots <VscGear />
          </p>
          <br />
          str. Main 521
          <br />
          Ukraine,Kyiv
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
