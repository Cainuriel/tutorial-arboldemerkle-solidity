# Tutorial de árbol de Merkle para solidity

## instalación

Proyecto inicilializado con VITE. 

### versión especial de hardhat para soporte básico de ESM
Se ha instalado la siguiente version de hardhat: ``` npm i hardhat@esm ```
Sobre el problema que me surgió y su solución:  
[aquí](https://github.com/NomicFoundation/hardhat/issues/957#issuecomment-1256094430)

Este es el motivo por el cual el archivo de configuración de hardhat acaba en ```.cjs``` junto al archivo deploy.

Esto me ha ocasionado problemas de compatiblidad con ``` "@nomiclabs/hardhat-ethers": "^2.1.1",
    "@nomiclabs/hardhat-waffle": "^2.0.3" ``` y la imposiblidad de instalar a través de npm.
Por ejemplo, la libreria  ``` @openzeppelin/contracts ``` la he instalado a mano.

Si alguien sabe la configuracion correcta de este proyecto agradecería mucho su dirección. 


