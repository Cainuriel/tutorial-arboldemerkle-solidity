
import { useEffect, useState } from "react";
import React from "react";
import { ethers } from "ethers";
import ReceiverPays from "./artifacts/contracts/ReceiverPays.sol/ReceiverPays.json";
import Swal from "sweetalert2";

const Example = () => {
  const [dataArray, setDataArray] = useState("");
  const [createArray, setCreateArray] = useState([]);
  const [rootHook, setRootHook] = useState("");
  const [treeHook, setTreeHook] = useState(null);
  const payContract = "0x65D56f700BF136b32162Ea82dAa55516d688B1c6";
  const [network, setNetwork] = useState("no-net");
  const BINANCENETWORK = "bnbt";
  const [doubleCheck, setDoubleChek] = useState(0);
  console.log("dato del input ", dataArray);
  console.log("array de datos ", createArray);

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

  function createRoot() {
    const leaves = createArray.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const buf2hex = (x) => "0x" + x.toString("hex");
    const root = buf2hex(tree.getRoot());
    console.log("Raiz del árbol", buf2hex(tree.getRoot()));
    setRootHook(root);
    setTreeHook(tree);
  }

  function checkData(event) {
      console.log("dato que ha entrado para comprobar",  event);
     const leaf = keccak256(event);
     console.log("Hoja de tu direccion ", leaf);
     const proof = treeHook.getProof(leaf).map((x) => buf2hex(x.data));
     console.log("Prueba de merkel ", proof);
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
              Ejemplo de árbol de merkle
            </h2>
            <p className="col-lg-10 fs-4 text-white">
              Para que compruebe su funcionamiento crearemos un array que
              representará a su base de datos que desea verificar en un futuro.
              Disponga entonces su colocación separados por comas en el campo
              "Datos" y nosotros crearemos el array por usted. Cuidado con los
              espacios si no desea que sean capturados.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              A continuación, apriete el botón "conseguir raíz", y se la
              pintaremos en pantalla.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Si no ve su saldo ingresado en el contrato apriete el botón verde.
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Si usted realiza un cheque de 1 BNB y tiene en el contrato solo
              0.5 ingresados{" "}
              <strong>el cheque no se cobrará ni se anulará</strong>. Puede
              ingresar posteriormente los 0.5 BNB faltantes para que el cobrador
              pueda ejecutar su cheque.{" "}
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <div className="form-floating mb-3">
                <input
                  value={dataArray}
                  onChange={(e) => setDataArray(e.target.value)}
                  type="text"
                  className="form-control"
                  id="amountToSend"
                />
                <label htmlFor="amountToSend">Datos</label>
              </div>
              <button
                id="btn-deposit"
                onClick={() => setCreateArray([...createArray, dataArray])}
                className="w-100 btn btn-lg btn-primary"
                type="button"
              >
                Introducir dato
              </button>
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
                  // value={dataArray}
                  onClick={(e) => checkData(e.target.value)}
                  type="text"
                  className="form-control"
                  id="dataSearch"
                />
                <label htmlFor="dataSearch">Dato a buscar</label>
                <button
                  id="checkData"
                  onClick={() => checkData()}
                  className="btn-success w-100 btn btn-lg"
                  type="button"
                >
                  Comprobar dato
                </button>
              </div>
              <small id="isInBDD" className="text-muted">
                True
              </small>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
