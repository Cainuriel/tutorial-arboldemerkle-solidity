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
  const [inputRoot, setInputRoot] = useState("");
  const [network, setNetwork] = useState("no-net");
  const nftContract = "0xfF53f8B4250e74d48f59F9c22C85C2781611C178";
  const BINANCENETWORK = "bnbt";
  const [doubleCheck, setDoubleChek] = useState(0);

  console.log("data Value ", dataValue);
  console.log("array ", dataArray);

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
              Generalmente, la generación de una white list para compra o acceso
              a un proyecto suele ser recabada por medios tradicionales
              offChain. Esto es un quebradero de cabeza para los desarrolladores
              web3. Ya que nosotros consideramos más seguro y eficiente un
              registro directo sobre el contrato. Es decir, que cada usuario que
              desee estar en la whitelist pase por la dApp y se registre el
              mismo en el contrato. Con ello evitamos errores o reclamaciones.
              Pero una cosa es como se debería hacer y otra cosa es como se
              "suele hacer". Aplicando el principio de que "aquí, se ha hecho
              siempre así" los desarrolladores blockchain no tenemos otra que
              saber conectar con "las viejas prácticas".
            </p>
            <p className="col-lg-12 fs-4 text-white">
              Una de las soluciones para no tener que registrar en bruto una
              base de datos de cuentas priviliegiadas es con el uso de éste
              árbol de merkle. Recabada las direcciones de la forma tradicional,
              se registrarán en un array para generar la correspondiente root. A
              partir de ahí, el contrato verificará la dirección que le llame
              con la prueba de merkle correspondiente.
            </p>
            <p className="col-lg-12 fs-4 text-white">
              Vamos a verlo detenidamente.
            </p>
            <p className="col-lg-12 fs-4 text-white">
              Primeramente generaremos un array de direcciones en las que ha de
              introducir alguna que usted posea. Introduzca una a una estos
              datos en el campo "Introduzca dirección" del panel "Registro
              Array" y apriete "Registrar dato" tantas veces como direcciones
              desee registrar. Ellos crearán el array con el que generará su
              base de datos a verificar.
            </p>
            <p className="col-lg-12 fs-4 text-white">
              Cuando considere que ha introducido todos los datos que desee
              verificar apriete el botón de "Conseguir raíz". Aparecerá abajo
              del mismo y guárdela.
            </p>
            <p className="col-lg-12 fs-4 text-white">
              A continuación tendrá que registrar su raíz en el contrato de NFTs. 
              Como éste es un contrato con fines educativos en el se permite tantos
              registros como usuarios interactuen con el. Evidentemente esto no es 
              funcional para un contrato que pretende verificar una lista segura. 
              Por lógica tendría que estar solo accesible para el owner o cuenta con role
              admin. 
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <h2>Registro Array</h2>
              <hr className="my-4" />
              <div className="form-floating mb-3">
                <input
                  // value={dataValue}
                  onChange={(e) => setDataValue(e.target.value)}
                  type="text"
                  className="form-control"
                  id="dataSearch"
                />
                <label htmlFor="dataSearch">Introduzca dato</label>
                <button
                  id="checkData"
                  onClick={() => {
                    return setDataArray([...dataArray, dataValue]);
                  }}
                  className="btn-success w-100 btn btn-lg"
                  type="button"
                >
                  Registrar dato
                </button>
              </div>
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
            <div style={{ height: "300px" }}></div>
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <h2>Contrato ERC721</h2>
              <hr className="my-4" />
              <div className="form-floating mb-3">
                <input
                  // value={dataValue}
                  onChange={(e) => setInputRoot(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputroot"
                />
                <label htmlFor="inputroot">Introduzca Root</label>

                <button
                  id="checkData"
                  onClick={() => setRootToContract()}
                  className="btn-success w-100 btn btn-lg"
                  type="button"
                >
                  Registrar Root
                </button>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solidity;
