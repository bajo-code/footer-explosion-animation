import ExplosionContainer from "./components/ExplosionContainer";

export default function Home() {
  return (
    <>
      <section className="hero"></section>
      <section className="about">
        <p>
          Film is not dead. Shoot film.
        </p>
      </section>
      <section className="outro"></section>
      <footer>
        <h1>bajo-code</h1>
        <div className="copyright-info">
          <p>2025</p>
          <p>Bun + Next.JS</p>
        </div>
        <ExplosionContainer />
      </footer>
    </>
  );
}