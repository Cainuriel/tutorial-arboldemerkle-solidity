
import { useEffect, useState } from "react";
import React from "react";
import { ethers } from "ethers";
import ReceiverPays from "./artifacts/contracts/ReceiverPays.sol/ReceiverPays.json";
import Swal from "sweetalert2";

const Example = () => {
  const [dataArray, setDataArray] = useState([
    "0x1C541e05a5A640755B3F1B2434dB4e8096b8322f",
    "0x1071258E2C706fFc9A32a5369d4094d11D4392Ec",
    "0x25f7fF7917555132eDD3294626D105eA1C797250",
    "0xF6574D878f99D94896Da75B6762fc935F34C1300",
    "0xfDbAb374ee0FC0EA0D7e7A60917ac01365010bFe",
    "0xfB73f8B1DcD5d61D4dDC3872dA53200B8562F243",
    "0x95F6E4C94857f605b9A73c9163D5c94AAf849c40",
    "0xEd2C82417256DF74a995213713A586E07d3e5255",
    "0xCb14d0D43BB32705fAbbD863f860A1410fa14613",
    "0x7a865e44988a2ebcad845E977db07C71f8c62d31",
    "0x340F5bEcB63a33B53959026d0CEb1f83C53A102F",
    "0x969560dBBf4872049D0d245791eD74dEd0D66578",
    "0x81B8888dfbdcc3Ad1dfe30A6f58a6d47eaf99aE8",
    "0x29aB6E246c4aC305974A730B10459417FF65D469",
    "0x2B790Dd5d9440f098E057E4958e3Ac0214712352",
    "0xA53E16be846D815dfF774A384858021952b5B22E",
    "0x04473648f6BeA9b074DFd7693b20AFCF9971a125",
    "0xc26716b827c0d207AA3D25667028C2da1De787bf",
    "0x21BAa9441e2DF389Ca27c9dB1cD9B59f2504dfEa",
    "0x93D5193694a49eB85366ea1BDa69B577f1b878ae",
    "0x3654322cFecCD60965A8b7866f50e55FE14EEBCC",
    "0x174BAFfcB004ACfc53cDD3A48957b9D353BB171f",
    "0x1d9A510DfCa2b1f3C52BD81122816FD86C7C7Ba0",
    "0x55ae457519BbAf25d825772da81F57bD18E4B6Db",
    "0x0997680928431EA22C1930c12Dc91f06d10be0c6",
    "0xF9E8383bd1250aCf18Da971467B70045d4D06fB1",
    "0x847aB63F94e931F9264407C54C97DbCfFEC9f8FE",
    "0x5dcE9Fc14eED67D046A130d1d991163114b2820c",
    "0x53b5585AA42b79B0b8e620896ceB0D0435441071",
    "0x5E661e550Fcac43DEC925449A7F0bCA0C32D6A44",
    "0xA46f327d91282aFD4E99d79a8fD7Eac7A123dAF5",
    "0xD03241a89a18c779B71f1bD348d2BbF1e20b8ea8",
    "0xed0850a960ABE5715ECEa4b479272092733922f0",
    "0x4D15f921A25e8677Da2d878B01c80Df861E67F03",
    "0x98d450BfbBFD64D780B632f6acd0FC59d11E575e",
    "0xaef0FfA370108915d4198Fe6eF40eBa446f00d79",
    "0x5Bc46cf525E6E26f8799685E5247a93355354cBf",
    "0x5B9837c339F7b55564Aeb185e8DEdeEDD10AfcB7",
    "0xbda8049200F7a42312AFeBDb5b99D514EE0df302",
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0x322d9e3F049a845e9C8ED089B2Bdf8F33c65a08F",
  ]);
  const [dataValue, setDataValue] = useState("");
  const [rootHook, setRootHook] = useState("");
  //const [treeHook, setTreeHook] = useState(null);
  const [find, setFind] = useState(false)
  const [network, setNetwork] = useState("no-net");
  const BINANCENETWORK = "bnbt";
  const [doubleCheck, setDoubleChek] = useState(0);

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
  }, [find])
  

  function createRoot() {
    const leaves = dataArray.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const buf2hex = (x) => "0x" + x.toString("hex");
    const root = buf2hex(tree.getRoot());
    console.log("Raiz del árbol", buf2hex(tree.getRoot()));
    const leaf = keccak256("0x322d9e3f049a845e9c8ed089b2bdf8f33c65a08f");
    console.log("Hoja de tu direccion ", leaf);
    const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
    console.log("Prueba de merkel ", proof);;
    setRootHook(root);
  }

  function checkData() {
      console.log("dato que ha entrado para comprobar",  dataValue);
     const leaf = keccak256("0x3654322cFecCD60965A8b7866f50e55FE14EEBCC");
    console.log("Hoja de tu direccion ", leaf);
    const leaves = dataArray.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = buf2hex(tree.getRoot());
    console.log("Raiz del árbol", root);
     const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));
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
              Para que compruebe su funcionamiento vamos a comprobar si existe
              un dato del siguiente array:
            </p>
            <p className="col-lg-10 fs-4 text-white">
              [ "0x1C541e05a5A640755B3F1B2434dB4e8096b8322f",
              "0x1071258E2C706fFc9A32a5369d4094d11D4392Ec",
              "0x25f7fF7917555132eDD3294626D105eA1C797250",
              "0xF6574D878f99D94896Da75B6762fc935F34C1300",
              "0xfDbAb374ee0FC0EA0D7e7A60917ac01365010bFe",
              "0xfB73f8B1DcD5d61D4dDC3872dA53200B8562F243",
              "0x95F6E4C94857f605b9A73c9163D5c94AAf849c40",
              "0xEd2C82417256DF74a995213713A586E07d3e5255",
              "0xCb14d0D43BB32705fAbbD863f860A1410fa14613",
              "0x7a865e44988a2ebcad845E977db07C71f8c62d31",
              "0x340F5bEcB63a33B53959026d0CEb1f83C53A102F",
              "0x969560dBBf4872049D0d245791eD74dEd0D66578",
              "0x81B8888dfbdcc3Ad1dfe30A6f58a6d47eaf99aE8",
              "0x29aB6E246c4aC305974A730B10459417FF65D469",
              "0x2B790Dd5d9440f098E057E4958e3Ac0214712352",
              "0xA53E16be846D815dfF774A384858021952b5B22E",
              "0x04473648f6BeA9b074DFd7693b20AFCF9971a125",
              "0xc26716b827c0d207AA3D25667028C2da1De787bf",
              "0x21BAa9441e2DF389Ca27c9dB1cD9B59f2504dfEa",
              "0x93D5193694a49eB85366ea1BDa69B577f1b878ae",
              "0x3654322cFecCD60965A8b7866f50e55FE14EEBCC",
              "0x174BAFfcB004ACfc53cDD3A48957b9D353BB171f",
              "0x1d9A510DfCa2b1f3C52BD81122816FD86C7C7Ba0",
              "0x55ae457519BbAf25d825772da81F57bD18E4B6Db",
              "0x0997680928431EA22C1930c12Dc91f06d10be0c6",
              "0xF9E8383bd1250aCf18Da971467B70045d4D06fB1",
              "0x847aB63F94e931F9264407C54C97DbCfFEC9f8FE",
              "0x5dcE9Fc14eED67D046A130d1d991163114b2820c",
              "0x53b5585AA42b79B0b8e620896ceB0D0435441071",
              "0x5E661e550Fcac43DEC925449A7F0bCA0C32D6A44",
              "0xA46f327d91282aFD4E99d79a8fD7Eac7A123dAF5",
              "0xD03241a89a18c779B71f1bD348d2BbF1e20b8ea8",
              "0xed0850a960ABE5715ECEa4b479272092733922f0",
              "0x4D15f921A25e8677Da2d878B01c80Df861E67F03",
              "0x98d450BfbBFD64D780B632f6acd0FC59d11E575e",
              "0xaef0FfA370108915d4198Fe6eF40eBa446f00d79",
              "0x5Bc46cf525E6E26f8799685E5247a93355354cBf",
              "0x5B9837c339F7b55564Aeb185e8DEdeEDD10AfcB7",
              "0xbda8049200F7a42312AFeBDb5b99D514EE0df302",
              "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
              "0x322d9e3F049a845e9C8ED089B2Bdf8F33c65a08F", ]
            </p>
            <p className="col-lg-10 fs-4 text-white">
              Primeramente obtenga la raíz apretando el botón ""
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
                  // value={dataArray}
                  onChange={(e) => setDataValue(e.target.value)}
                  type="text"
                  className="form-control"
                  id="dataSearch"
                />
                <label htmlFor="dataSearch">Dato a buscar</label>
                <button
                  id="checkData"
                  onClick={(e) => checkData()}
                  className="btn-success w-100 btn btn-lg"
                  type="button"
                >
                  Comprobar dato
                </button>
              </div>
              <div id="isInBDD" className="text-muted">
                {find !== null && 
                <div>
                {find ?
                <div>
                <img src="./assets/find.gif" lang="dato encontrado" />
                <small>Dato encontrado</small></div>
                :
                <div>
                <img src="./assets/nofind.gif" lang="dato no encontrado" />
                <small>Dato no encontrado</small></div>}
                </div>}
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
