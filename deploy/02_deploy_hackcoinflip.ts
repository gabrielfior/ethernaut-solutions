import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer } = await hre.getNamedAccounts();
	const { deploy } = hre.deployments;
	const useProxy = !hre.network.live;

	const deployed = await deploy('CoinFlip', {
		from: deployer,
		args: [],
		log: true,
		autoMine: true // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	console.log('deployed', deployed.address);

	await deploy('HackCoinFlip', {
		from: deployer,
		args: [deployed.address],
		log: true,
		autoMine: true // speed up deployment on local network (ganache, hardhat), no effect on live networks
	});

	return !useProxy; // when live network, record the script as executed to prevent rexecution
};
export default func;
func.id = 'HackCoinFlip'; // id required to prevent reexecution
func.tags = ['HackCoinFlip'];