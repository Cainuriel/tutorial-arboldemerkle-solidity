import React from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Intro = () => {
  useEffect(function () {
    changeAccounts();
  }, []);

  async function addNetwork() {
    let networkData = [
      {
        chainId: "0x61",
        chainName: "BSCTESTNET",
        rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
        nativeCurrency: {
          name: "BINANCE COIN",
          symbol: "BNB",
          decimals: 18,
        },
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
      },
    ];

    // agregar red o cambiar red
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: networkData,
    });
  }

  async function init() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let accountConnection = accounts[0];
      let subint = accountConnection.substr(0, 4);
      let subfinal = accountConnection.substr(-4, 4);
      document.querySelector("#intro").innerHTML =
        "conectado con la cuenta: " + subint + "..." + subfinal;
    } else {
      Swal.fire({
        title: "No tiene metamask instalado",
        text: "Cambie de navegador o puede instalárselo apretando al botón",
        showCancelButton: true,
        confirmButtonText: "Instalar",
        imageUrl: "./assets/metamask-transparent.png",
        imageAlt: "Instalar metamask",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.open(
            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
            "_blank",
            'rel="noreferrer"'
          );
        }
      });
    }
  }

  // funcion que detecta los cambios de cuenta
  async function changeAccounts() {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async function () {
        await init();
      });
    }
  }

  function faucet() {
    window.open(
      "https://testnet.binance.org/faucet-smart",
      "_blank",
      'rel="noreferrer"'
    );
  }

  return (
    <div className="App">
      <div className="b-example-divider"></div>
      <div className="bg-dark container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <h1 className="display-4 fw-bold lh-1 mb-3 text-white">
            Tutorial de árbol de merkle para solidity
          </h1>
        </div>
      </div>
      <div className="bg-dark container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3 text-white">
              ¿Qué es un árbol de merkle?
            </h1>
            <p className="col-lg-10 fs-4 text-white">
              Un árbol Merkle, es una estructura de datos dividida en varias
              capas que tiene como finalidad relacionar cada nodo con una raíz
              única asociada a los mismos. Gracias a esta estructura única, los
              árboles Merkle permiten relacionar una gran cantidad de datos en
              único punto (Merkle Root) y permite que no sea necesario el
              almacenaje de todos ellos para su posterior verificación.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Para lograr esto, cada nodo debe estar identificado con un
              identificador único (hash). Estos nodos iniciales, llamados nodos
              hijos (hojas), se asocian luego con un nodo superior llamado nodo
              padre (rama), parecido a la relación entre bloques que realiza la
              blockchain. El nodo padre, tendrá un identificador único resultado
              del hash de sus nodos hijos. Esta estructura se repite hasta
              llegar al nodo raíz o raíz Merkle (Merkle Root), que con nuestro
              ejemplo sobre la blockchain representaría al último bloque, cuya
              impronta está asociada a todos los nodos del árbol.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              De esta forma, la verificación y validación de esos datos, puede
              pasar a ser muy eficiente, al tener que solo verificar el Merkle
              Root en lugar de toda la estructura.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              {" "}
              Este diseño fue creado por Ralph Merkle, en el año de 1979, con el
              fin de agilizar el proceso de verificación de grandes cantidades
              de datos.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <img
              src="./assets/maxresdefault.jpg"
              width="300"
              alt="dibujo de canal de pago"
            />
            <div></div>
          </div>
        </div>
      </div>
      <div className="bg-dark container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h2 className="display-4 fw-bold lh-1 mb-3 text-white">
              Usaremos la red Binance Smart Chain
            </h2>
            <p className="col-lg-10 fs-4 text-white">
              Lo primero, deme su permiso para conectarme a su Metamask. La
              conexión automática de su metamask por parte de una DAPP es una
              mala práctica. Téngalo en cuenta a la hora de crear la suya.{" "}
            </p>
            <p className="col-lg-10 fs-4 text-white">
              {" "}
              Si usted <strong>no dispone</strong> de la red de pruebas de BSC,
              se instalará apretando <strong>el botón naranja</strong>. Si ya la
              dispone, cambiará a esa red automáticamente.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Si no tenía la Red, tampoco tendra BNBs de prueba para hacer el
              tutorial. Apretando al boton azul usted podrá reclamar un BNB para
              poder crear un cheque.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <button
              id="btn-firma"
              onClick={() => init()}
              className="w-100 btn btn-lg btn-danger mb-4"
              type="button"
            >
              Conectar Metamask
            </button>
            <button
              id="bnbNetwork"
              onClick={() => addNetwork()}
              className="w-100 btn btn-lg btn-warning mb-4"
              type="button"
            >
              Añadir Red Binance Smart Chain de pruebas
            </button>

            <button
              id="faucet"
              onClick={() => faucet()}
              className="w-100 btn btn-lg btn-primary"
              type="button"
            >
              Faucet de Binance
            </button>
            <hr className="my-4" />
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <div className="form-floating mb-3"></div>
              <hr className="my-4" />
              <small id="intro" className="text-muted">
                No conectado
              </small>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
