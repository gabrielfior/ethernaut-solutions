# Ethernaut solutions

This project contains scripts and the contracts used for solving the Ethernaut exercises (https://ethernaut.openzeppelin.com/), produced by OpenZeppelin.

Rename .env.sample to .env and add the required variables (specially RPC endpoints).

For compiling the contracts:

```shell
yarn hardhat compile
```

For executing one of the scripts (for example, the fallback exercise # 2):
```shell
yarn hardhat run scripts/fallback.ts
```

