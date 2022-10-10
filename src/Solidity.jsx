import { useEffect, useState } from "react";
import React from "react";
import { ethers } from "ethers";
import NFT_MERKLE from "./artifacts/contracts/NFT_MERKLE.sol/NFT_MERKLE.json";
import Swal from "sweetalert2";

const Solidity = () => {
  const [dataArray, setDataArray] = useState([]);
  const [dataValue, setDataValue] = useState("");
  const [rootHook, setRootHook] = useState("");
  const [buyNFTOk, setBuyNFTOk] = useState(false);
  const [inputRoot, setInputRoot] = useState("");
  const [network, setNetwork] = useState("no-net");
  const [register, setRegister] = useState(null);
  const nftContract = "0xaE4f5cb0F2dbAE7Bff53ca6B585f966EA8E6736F";
  const BINANCENETWORK = "bnbt";
  const [doubleCheck, setDoubleChek] = useState(false);

  //console.log("data Value ", dataValue);
  //console.log("array ", dataArray);

  async function setRootToContract() {

    if (!doubleCheck) {
       setDoubleChek(true);
       const [account] = await window.ethereum.request({
         method: "eth_requestAccounts",
       });
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const signer = provider.getSigner();
       const contract = new ethers.Contract(
         nftContract,
         NFT_MERKLE.abi,
         signer
       );
       //let bnbAmount = ethers.utils.parseEther(amount).toString();
       try {
         const tx = await contract.rootUser(rootHook);
         Swal.fire({
           title: "Procesando el registro de su root",
           text: "Espere, y no actualice la página",
           // icon: 'info',
           showConfirmButton: false,
           imageUrl:
             "https://thumbs.gfycat.com/ConventionalOblongFairybluebird-size_restricted.gif",
           imageWidth: 100,
           imageHeight: 100,
           imageAlt: "Procesando el ingreso",
         });
         const Ok = await tx.wait();
         if (Ok) {
           setDoubleChek(false);
           Swal.fire({
             title: `Se ha enviado el hash: ${rootHook} de su root al contrato ${nftContract}`,
             html: `<a href="https://testnet.bscscan.com/tx/${tx.hash}" target="_blank" rel="noreferrer">Hash de la transacción</a>`,
             icon: "success",
             confirmButtonText: "Cerrar",
           });
         }
       } catch (err) {
         let mensajeError = err.message;
         setDoubleChek(false);
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


  function createRoot() {
    const leaves = dataArray.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const buf2hex = (x) => "0x" + x.toString("hex");
    const root = buf2hex(tree.getRoot());
    console.log("Raiz del árbol", root);
    setRootHook(root);
  }

  async function createProof() {
    if (!doubleCheck) {
      setDoubleChek(true);
     const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    console.log("direccion a buscar ", account);
    const buf2hex = (x) => "0x" + x.toString("hex");
    // creamos las hojas
    const leaves = dataArray.map((addr) => keccak256(addr));
    // creamos el arbol
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const rootHash = merkleTree.getRoot().toString("hex");
    // console.log("arbol de merkle", merkleTree.toString());
    // console.log("raiz ", rootHash);
    // creamos el hash del dato ha comprobar
    const hashedAddress = keccak256(account);
    console.log("hoja del dato ", buf2hex(hashedAddress));
    const proof = merkleTree.getHexProof(hashedAddress);
    console.log("Ruta en el arbol, prueba de existencia: ", proof);
    await buyNFT(proof);
    }
 

  }


  async function buyNFT(createProof) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftContract, NFT_MERKLE.abi, signer);

    try {
      await contract.callStatic.safeMint(createProof);
      const tx = await contract.safeMint(createProof);
      Swal.fire({
        title: "Procesando su compra de NFTs",
        text: "Espere, y no actualice la página",
        // icon: 'info',
        showConfirmButton: false,
        imageUrl:
          "https://thumbs.gfycat.com/ConventionalOblongFairybluebird-size_restricted.gif",
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Procesando su compra",
      });
      const Ok = await tx.wait();
      if (Ok) {
         setDoubleChek(false);
        Swal.fire({
          title: `Se ha enviado un  NFT a su cuenta`,
          html: `<a href="https://testnet.bscscan.com/tx/${tx.hash}" target="_blank" rel="noreferrer">Hash de la transacción</a>`,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        setBuyNFTOk(true);
      }
    } catch (err) {
      let mensajeError = err.reason;
       setDoubleChek(false);
      Swal.fire({
        title: "Ooops!",
        text: `${mensajeError}`,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      console.log("Error: ", err);
    }
  }

    useEffect(() => {
      if (find !== null) {
        setTimeout(() => {
          // eliminamos la animacion a los cuatro segundos.
          setRegister(null);
        }, 1000);
      }
    }, [register]);

  return (
    <div className="App">
      <div className="b-example-divider"></div>
      <div className="bg-dark container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          {!buyNFTOk && (
            <div className="col-lg-7 text-center text-lg-start">
              <h2 className="display-4 fw-bold lh-1 mb-3 text-white">
                Ejemplo con Solidity: Whitelist de compra de NFTs
              </h2>
              <p className="col-lg-12 fs-4 text-white">
                Generalmente, la generación de una whitelist para compra o
                acceso a un proyecto suele ser recabada por medios tradicionales
                offChain. Esto suele ser un quebradero de cabeza para los
                desarrolladores Web3. Ya que nosotros consideramos más seguro y
                eficiente un registro directo sobre el contrato. Es decir, que
                cada usuario que desee estar en la whitelist pase por la dApp y
                se registre el mismo en el contrato. Con ello evitamos errores o
                reclamaciones. Pero una cosa es como se debería hacer y otra
                cosa es como se "suele hacer". Aplicando el principio de que
                "aquí, se ha hecho siempre así" los desarrolladores blockchain
                no tenemos otra que saber conectar con "las viejas prácticas".
              </p>
              <p className="col-lg-12 fs-4 text-white">
                Una de las soluciones para no tener que registrar en bruto una
                base de datos de cuentas priviliegiadas es con el uso de éste
                árbol de merkle. Recabada las direcciones de la forma
                tradicional, se registrarán en un array para generar la
                correspondiente root. A partir de ahí, el contrato verificará la
                dirección que le llame con la prueba de merkle correspondiente.
              </p>
              <p className="col-lg-12 fs-4 text-white">
                Vamos a verlo detenidamente.
              </p>
              <p className="col-lg-12 fs-4 text-white">
                Primeramente generaremos un array de direcciones en las que ha
                de introducir alguna que usted posea. Introduzca una a una estos
                datos en el campo "Introduzca dirección" del panel "Registro
                Array" y apriete "Registrar dato" tantas veces como direcciones
                desee registrar. Así se creará el array con el que generará su
                base de datos a verificar. Recuerde que si actualiza la página
                los datos registrados se perderán.
              </p>
              <p className="col-lg-12 fs-4 text-white">
                Cuando considere que ha introducido todos los datos que desee
                verificar apriete el botón de "Conseguir raíz". Aparecerá
                entonces tando debajo como en el campo "Root" del siguiente
                panel de interración con el contrato de NFTs.
              </p>
              <p className="col-lg-12 fs-4 text-white">
                A continuación tendrá que registrar su raíz en el contrato de
                NFTs. Como éste es un contrato con fines educativos en el se
                permite tantos registros como usuarios interactuen con el.
                Evidentemente esto no es funcional para un contrato que pretende
                verificar una lista segura. Por lógica tendría que estar solo
                accesible para el owner o cuenta con role admin. También he
                dejado en el contrato un acceso público a la función de
                validación del árbol de merkle: "isValid", para que usted pueda
                hacer pruebas con el contrato desde Remix.
              </p>
              <p className="col-lg-12 fs-4 text-white">
                Registrada la raíz en el contrato intente ahora adquirir un NFT
                con una cuenta que haya registado en su base de datos. Si la
                dirección estaba en los datos introducidos por usted le
                permitirá la compra gratuita en nuestro ejemplo. En caso
                contrario le rechazará la transacción.
              </p>
            </div>
          )}
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <h2>Registro Array</h2>
              <hr className="my-4" />
              <div className="form-floating mb-3">
                <input
                  
                  onChange={(e) => setDataValue(e.target.value)}
                  type="text"
                  className="form-control"
                  id="dataSearch"
                />
                <label htmlFor="dataSearch">Introduzca dirección</label>
                <button
                  id="checkData"
                  onClick={() => {
                    setRegister(true);
                    return setDataArray([...dataArray, dataValue]);
                    }
                  }
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
              <div id="registerAddresses" className="text-muted">
                {register !== null && (
                  <div>
                    {register ? (
                      <div>
                        <img src="./assets/find.gif" lang="dato encontrado" />
                        <small>¡Registrado!</small>
                      </div>
                    ) : (
                      <div>
                        <img
                          src="./assets/nofind.gif"
                          lang="dato no encontrado"
                        />
                        <small>Error en el registro</small>
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
                  value={rootHook}
                  onChange={(e) => setInputRoot(e.target.value)}
                  type="text"
                  className="form-control"
                  id="inputroot"
                />
                <label htmlFor="inputroot">Root</label>

                <button
                  id="registerRoot"
                  onClick={() => setRootToContract()}
                  className="btn-success w-100 btn btn-lg"
                  type="button"
                >
                  Registrar Root
                </button>
              </div>
              <hr className="my-4" />
              <button
                id="btn-buy-nft"
                onClick={() => createProof()}
                className="w-100 btn btn-lg btn-danger"
                type="button"
              >
                Comprar NFT
              </button>
              <hr className="my-4" />
            </form>
          </div>{" "}
          {buyNFTOk && <img src="assets/nft.png" lang="imagen de NFT" />}
        </div>
      </div>
    </div>
  );
};

export default Solidity;
