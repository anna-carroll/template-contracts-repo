## Contracts Template Repo
This is a template repo that you can fork and modify to start a new smart contract project. 

## Installation
1. Install dependencies
```bash
npm i
```

2. Setup your `.env` file in order to deploy the contracts
```bash
touch .env && cat .env.example > .env
```
Then, populate the values in `.env`.

## Tests
To run the Hardhat tests, simply run
```bash
npm run test
```

## Deployment
You can find the address of deployed contract on each chain at `deploy/deployed-contracts`

To deploy a set of contracts yourself, first ensure you've populated your `.env` file. The RPC endpoint should point chain you want to deploy the contracts, and the private key of the Deployer account should be funded with ETH on that chain.

Next, add a config file to `deploy/configs/[CHAIN_NAME].json` specifying the addresses of the necessary external protocols on that chain. You can use other files in that folder to see which contract addresses must be populated.

Finally, run
```bash
npm run deploy
```

## Other README Sections
- **Features** - what can your contracts do?
- **Functions** - what functions can be called on your contracts to interact with them?
- **Repo Layout** - where can I find the relevant contracts in this repo?

## Credits
- [Anna Carroll](https://twitter.com/annascarroll) authored the code in this repo
- who else helped?

## License
Contracts in this repo are reproduceable under the terms of [MIT license](https://en.wikipedia.org/wiki/MIT_License). 

MIT © Anna Carroll
