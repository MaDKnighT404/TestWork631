import Navigation from "./components/Navigation";

export default function Header() {
  return (
    <header className="bg-body-tertiary px-2">
      <nav className="navbar navbar-expand-md container">
        <h2 className="mb-0">Synoptic+</h2>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Navigation />
      </nav>
    </header>
  );
}
