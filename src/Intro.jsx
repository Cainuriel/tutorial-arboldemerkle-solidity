import React from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Intro = () => {
  
  useEffect(function () {
    changeAccounts();
  }, []);


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
              Un árbol Merkle es una estructura de datos dividida en varios
              niveles que están relacionados como nodos de una raíz única.
              Los árboles de Merkle permiten
              relacionar una gran cantidad de datos en un único punto (Merkle
              Root) y permite con ello que no sea necesario el almacenaje de
              todos ellos para una posterior verificación.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Para lograr esto cada nodo debe estar identificado con un hash.
              Estos nodos iniciales, llamados nodos hijos u hojas, se asocian
              luego con un nodo superior llamado nodo padre o rama, que no es
              más que otro hash generado con los hashes hijos. El proceso se
              parece a la encadenación entre bloques que se realiza en una
              blockchain. Esta estructura se repite hasta llegar a un nodo final
              llamado raíz o raíz de Merkle (Merkle Root), que con nuestro
              ejemplo sobre la blockchain representaría al último bloque, cuya
              impronta de todos los datos anteriores estará representada con el
              hash heredado.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              De esta forma, la verificación y validación de unos datos puede
              ser muy eficiente y barata. Solo es necesario registrar en el
              contrato la raíz de los datos.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              {" "}
              Este diseño fue creado por{" "}
              <a href="https://es.wikipedia.org/wiki/Ralph_Merkle" target="_blanck">
                Ralph Merkle
              </a>
              , en el año de 1979, con el fin de agilizar el proceso de
              verificación de grandes cantidades de datos.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <a
              href="./assets/dibujo.png"
              target={"_blank"}
              lang="dibujo de arbol de merkle"
            >
              <img
                src="./assets/dibujo.png"
                width="300"
                alt="dibujo de canal de pago"
              />
            </a>
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
              conexión automática de su metamask por parte de una dAPP es una
              mala práctica. Téngalo en cuenta a la hora de crear la suya.{" "}
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Si no tiene BNBs de prueba para hacer el
              tutorial apriete el botón azul para poder reclamar tokens y así poder pagar las transacciones.
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
