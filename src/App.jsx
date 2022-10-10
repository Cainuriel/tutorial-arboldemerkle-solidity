import "./App.css";
import Intro from "./Intro";
import Example from "./Example";
import Solidity from "./Solidity";

function App() {


  return (
    <div className="App">
      <Intro />
      <Example />
      <Solidity />
      {/* Footer */}
      <footer
        className="text-center text-white my-3 container"
        style={{ backgroundColor: "rgb(128, 0, 70)" }}
      >
        <div className="p-4 pb-0">
          <section className="">
            <a
              className="text-decoration-none"
              href="https://github.com/Cainuriel/tutorial-arboldemerkle-solidity"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Código en Github </span>
                <i className="fab fa-github"></i>
              </p>
            </a>
          </section>
        </div>
        <div
          className="text-center p-3 container"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          2022{" "}
          <a
            className="text-white text-decoration-none"
            href="https://cainuriel.github.io/"
          >
            {" "}
            <img src="./assets/favicon.ico" />
            Developer Superloper
          </a>
          <div>
            <a
              className="text-decoration-none"
              href="https://testnet.bscscan.com/address/0xaE4f5cb0F2dbAE7Bff53ca6B585f966EA8E6736F#code"
              target="_blank"
            >
              Contrato en Ethersann
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
 export default App;
