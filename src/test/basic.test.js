import path from "path";
import { init } from "flow-js-testing/dist/utils/init";
import { deployContractByName } from "flow-js-testing/dist/utils/deploy-code";
import { getAccountAddress } from "flow-js-testing/dist/utils/create-account";
import { getContractAddress } from "flow-js-testing/dist/utils/contract";
import {
  getFlowBalance,
  mintFlow,
} from "flow-js-testing/dist/utils/flow-token";

const basePath = path.resolve(__dirname, "../");
init(basePath);

describe("basic contract test suit", function () {
  test("get account", async () => {
    try {
      const address = await getAccountAddress("alice");
      expect(address).not.toBe(undefined);
    } catch (e) {
      console.log("ERROR");
      console.log(e);
      expect(e.errorMessage).toBe("");
    }
  });

  test("deploy contract", async () => {
    let deployTx;
    try {
      deployTx = await deployContractByName({
        name: "Basic",
      });
    } catch (e) {
      console.log(e);
    }

    expect(deployTx.errorMessage).toBe("");
    expect(deployTx.status).toBe(4);
  });

  test("get contract address", async () => {
    const contractAddress = await getContractAddress("Basic");
    console.log({ contractAddress });
  });

  test("get account FLOW balance", async () => {
    const newAccountAddress = await getAccountAddress("newbee");
    const balance = await getFlowBalance(newAccountAddress);
    console.log({ balance });
    await mintFlow(newAccountAddress, "10.572");
    const newBalance = await getFlowBalance(newAccountAddress);
    console.log({ newBalance });
  });
});
