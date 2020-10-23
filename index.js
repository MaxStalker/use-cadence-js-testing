"use strict";
const path = require("path");

let testPackage = require("flow-js-testing");
const {
  createAccount,
  deployContract,
  getTemplate,
  executeScript,
} = testPackage;

const getContractTemplate = (contractName, addressMap) => {
  const resolvedPath = path.resolve(`./src/contracts/${contractName}.cdc`);
  return getTemplate(resolvedPath, addressMap);
};

const getScriptTemplate = (scriptName, addressMap) => {
  const resolvedPath = path.resolve(`./src/scripts/${scriptName}.cdc`);
  return getTemplate(resolvedPath, addressMap);
};

const main = async () => {
  const contractAddress = await createAccount();
  const contractCode = getContractTemplate("Basic");
  console.log({ contractCode });

  try {
    const deployTx = await deployContract(contractAddress, contractCode);
  } catch (error) {
    console.log("Something went wrong:");
    console.log(error);
  }

  console.log({ contractAddress });
  const scriptCode = getScriptTemplate("read-message", {
    Basic: contractAddress,
  });

  console.log({ scriptCode });

  try {
    const message = await executeScript({ code: scriptCode });
    console.log({ message });
  } catch (error) {
    console.log("Something went wrong:");
    console.log(error);
  }
};

main();
