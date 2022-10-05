import "./App.css";
import { useState } from "react";
import Swal from "sweetalert2";
//import Signature from "./artifacts/contracts/Signature.sol/Signature.json";
import Intro from "./Intro";
import Example from "./Example";
import Solidity from "./Solidity";
import { ethers } from "ethers";
function App() {
  const [recipient, setRecipient] = useState("");
  const [nonce, setNonce] = useState(Math.floor(new Date().getTime() / 1000.0));
  const [amount, setAmount] = useState("0.1");
  const [user, setUser] = useState(""); // 0x00e55244c13FfA6D6313718459D82536F43F6dcf
  const [contractAddress, setContractAddress] = useState(
    "0x65D56f700BF136b32162Ea82dAa55516d688B1c6"
  ); // contrato de cobro.
  const signatureAddress = "0x854F2CBa80dAe7989Dd5729Ed2a71A1923d43243";
  const [signedHash, setSignedHash] = useState("");
  const [condition, setCondition] = useState(true);

  async function signPayment() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        signatureAddress,
        Signature.abi,
        signer
      );
      let bnbAmount = ethers.utils.parseEther(amount).toString();

      try {
        const hash = await contract.getMessageHash(
          recipient,
          bnbAmount,
          nonce,
          contractAddress
        );
        let sig = await window.ethereum.request({
          method: "personal_sign",
          params: [account, hash],
        });
        Swal.fire({
          title: "Copie los datos para enviar al cobrador",
          text: `Numero de serie: ${nonce} Importe: ${amount} Pagador: ${account} Hash firmado: ${sig}`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Copiar al portapapeles`,
          denyButtonText: `Solo quería ver como era`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           
            Swal.fire("Datos Copiados a su portapapeles", "", "success");
          } else if (result.isDenied) {
            Swal.fire(
              "El formulario conserva los datos si aún desea recuperarlos. En la consola de Javascript podrá encontrar el hash firmado.",
              "",
              "info"
            );
          }
        });
        console.log("hash firmado: ", sig);
        setSignedHash(sig);
        setUser(account);
      } catch (err) {
        let mensajeError = err.message;
        Swal.fire({
          title: "Ooops!",
          text: `${mensajeError}`,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        console.log("Error: ", err);
      }
    }
  }

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
              href="https://github.com/Cainuriel/ERC-Contracts/tree/main/payment-channel"
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
        </div>
      </footer>
    </div>
  );
}

export default App;
