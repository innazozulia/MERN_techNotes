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
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
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
          <a href="tel:+044444098123">044 444 098 123</a>
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
