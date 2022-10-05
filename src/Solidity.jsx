import { useEffect, useState } from "react";
import React from "react";
import { ethers } from "ethers";
import ReceiverPays from "./artifacts/contracts/ReceiverPays.sol/ReceiverPays.json";
import Swal from "sweetalert2";

const Solidity = () => {
  const [dataArray, setDataArray] = useState([]);
  const [dataValue, setDataValue] = useState("");
  const [rootHook, setRootHook] = useState("");
  const [find, setFind] = useState(false);
  const [network, setNetwork] = useState("no-net");
  const BINANCENETWORK = "bnbt";
  const [doubleCheck, setDoubleChek] = useState(0);

  // console.log("data Value ", dataValue);

  async function takeNetwork() {
    console.log("dentro de takeNetwork");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    console.log("network", network.name);
    setNetwork(network.name);
  }

  // async function moreMoney() {
  //   if (typeof window.ethereum !== "undefined") {
  //     if (network == BINANCENETWORK || doubleCheck == 1) {
  //       const [account] = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(
  //         payContract,
  //         ReceiverPays.abi,
  //         signer
  //       );
  //       let bnbAmount = ethers.utils.parseEther(amount).toString();
  //       try {
  //         const tx = await contract.moreMoney({ value: bnbAmount });
  //         Swal.fire({
  //           title: "Procesando el ingreso",
  //           text: "Espere, y no actualice la página",
  //           // icon: 'info',
  //           showConfirmButton: false,
  //           imageUrl:
  //             "https://thumbs.gfycat.com/ConventionalOblongFairybluebird-size_restricted.gif",
  //           imageWidth: 100,
  //           imageHeight: 100,
  //           imageAlt: "Procesando el ingreso",
  //         });
  //         const Ok = await tx.wait();
  //         if (Ok) {
  //           Swal.fire({
  //             title: `Se ha enviado ${amount} BNB al contrato ${payContract}`,
  //             html: `<a href="https://testnet.bscscan.com/tx/${tx.hash}" target="_blank" rel="noreferrer">Hash de la transacción</a>`,
  //             icon: "success",
  //             confirmButtonText: "Cerrar",
  //           });
  //         }

  //         getBalanceUser();
  //       } catch (err) {
  //         let mensajeError = err.message;

  //         Swal.fire({
  //           title: "Ooops!",
  //           text: `${mensajeError}`,
  //           icon: "error",
  //           confirmButtonText: "Cerrar",
  //         });
  //         console.log("Error: ", err);
  //       }
  //     } else {
  //       setDoubleChek(1); // prevents double check
  //       isInNetwork();
  //     }
  //   }
  // }

  useEffect(() => {
    if (find !== null) {
      setTimeout(() => {
        // eliminamos la animacion a los cuatro segundos.
        setFind(null);
      }, 4000);
    }
  }, [find]);

  function createRoot() {
    const leaves = dataArray.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const buf2hex = (x) => "0x" + x.toString("hex");
    const root = buf2hex(tree.getRoot());
    console.log("Raiz del árbol", root);
    setRootHook(root);
  }

  function checkData() {
    const buf2hex = (x) => "0x" + x.toString("hex");
    // creamos las hojas
    const leaves = dataArray.map((addr) => keccak256(addr));
    // creamos el arbol
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const rootHash = merkleTree.getRoot().toString("hex");
    // console.log("arbol de merkle", merkleTree.toString());
    // console.log("raiz ", rootHash);
    // creamos el hash del datao ha comprobar
    const hashedAddress = keccak256(dataValue);
    console.log("hoja del dato ", buf2hex(hashedAddress));
    const proof = merkleTree.getHexProof(hashedAddress);
    console.log("Ruta en el arbol, prueba de existencia: ", proof);
    // final verification
    const v = merkleTree.verify(proof, hashedAddress, rootHash);
    setFind(v);
  }

  async function isInNetwork() {
    console.log("en isInNetwork");
    if (network !== "no-net" || network === BINANCENETWORK) {
      Swal.fire({
        title: "red",
        //text: `Cambia a BSC si la tienes o sigue el siguiente tutorial para configurarla`,
        text:
          "Estás en la red " +
          network +
          ", has de cambiar a la red " +
          BINANCENETWORK,
        confirmButtonText: "Cambiar o instalar red BNB de pruebas",
        //imageUrl: 'https://i2.wp.com/criptotendencia.com/wp-content/uploads/2020/04/binance-smart-chain.jpg?fit=1200%2C674&ssl=1',
        imageUrl: "https://cryptodaily.io/wp-content/uploads/2021/07/p-2.png",
        imageWidth: 300,

        imageAlt: "Red Binance Smart Chain",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          addNetwork();
          //window.open('https://academy.binance.com/es/articles/connecting-metamask-to-binance-smart-chain', '_blank');
        }
      });
    } else {
      moreMoney();
    }
  }

  useEffect(
    function () {
      takeNetwork();
      changeAccounts();
    },
    [network]
  );

  // async function getBalanceUser() {
  //   const [account] = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(payContract, ReceiverPays.abi, signer);

  //   try {
  //     const contractUserBalance = await contract.recipientBalance(account);
  //     let amount = ethers.utils.formatEther(contractUserBalance).toString();
  //     let bnbAmount = Number.parseFloat(amount).toFixed(2);
  //     setBalance(`Dispone de ${bnbAmount} BNB ingresados`);
  //   } catch (err) {
  //     let mensajeError = err.message;
  //     Swal.fire({
  //       title: "Ooops!",
  //       text: `${mensajeError}`,
  //       icon: "error",
  //       confirmButtonText: "Cerrar",
  //     });
  //     console.log("Error: ", err);
  //   }
  // }

  // funcion que detecta los cambios de cuenta
  async function changeAccounts() {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async function () {
        // await getBalanceUser();
      });
    }
  }

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
    return window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: networkData,
      })
      .then(takeNetwork());
  }

  return (
    <div className="App">
      <div className="b-example-divider"></div>
      <div className="bg-dark container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h2 className="display-4 fw-bold lh-1 mb-3 text-white">
              Ejemplo con Solidity: White List de compra de NFTs
            </h2>
            <p className="col-lg-12 fs-4 text-white">
              Para que compruebe su funcionamiento vamos a comprobar si existe
              un dato de los siguientes con el panel que encontrará a su
              izquierda del texto:
            </p>
            <p className="col-lg-12 fs-4 text-white">
              Coloque un dato de la lista vigilando no dejar ningún espacio.
              Seguidamente apriete el botón "Comprobar dato". Haga lo propio
              ahora con un dato ajeno a la lista compartida.
            </p>
            <p className="col-lg-12 fs-4 text-white">
              Las búsquedas se generarán y si encuentra el dato aparecerá un
              check, en caso contrario le avisará de su inexistencia. Si quiere
              ver la prueba del árbol de merkle abra la consola javascript. Esta
              prueba es "la ruta de hashes" correcta empezando por la hoja más
              baja: su dato compartido. Si al realizar la comprobación su dato
              no genera un hash existente todos los demás fallarán en cascada
              devolviendo un array vacio.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <div className="form-floating mb-3">
                {/* <input
                  value={dataArray}
                  onChange={(e) => setDataArray(e.target.value)}
                  type="text"
                  className="form-control"
                  id="amountToSend"
                />
                <label htmlFor="amountToSend">Datos</label> */}
              </div>
              {/* <button
                id="btn-deposit"
                onClick={() => setCreateArray([...createArray, dataArray])}
                className="w-100 btn btn-lg btn-primary"
                type="button"
              >
                Introducir dato
              </button> */}
              <button
                id="btn-deposit"
                onClick={() => createRoot()}
                className="w-100 btn btn-lg btn-primary"
                type="button"
              >
                Conseguir raíz
              </button>
              <hr className="my-4" />
              <input
                readOnly
                value={rootHook}
                type="text"
                className="form-control"
                id="root"
              />
              <label htmlFor="root">Raíz</label>
              <hr className="my-4" />
              <hr className="my-4" />
              <div className="form-floating mb-3">
                <input
                  value={dataValue}
                  onChange={(e) => setDataValue(e.target.value)}
                  type="text"
                  className="form-control"
                  id="dataSearch"
                />
                <label htmlFor="dataSearch">Dato a buscar</label>
                <button
                  id="checkData"
                  onClick={checkData}
                  className="btn-success w-100 btn btn-lg"
                  type="button"
                >
                  Comprobar dato
                </button>
              </div>
              <div id="isInBDD" className="text-muted">
                {find !== null && (
                  <div>
                    {find ? (
                      <div>
                        <img src="./assets/find.gif" lang="dato encontrado" />
                        <small>Dato encontrado</small>
                      </div>
                    ) : (
                      <div>
                        <img
                          src="./assets/nofind.gif"
                          lang="dato no encontrado"
                        />
                        <small>Dato no encontrado</small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solidity;
