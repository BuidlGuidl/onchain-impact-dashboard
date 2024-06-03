# Onchain Impact Dashboard

OID enables builders to view their ongoing impact post-Retro Funding 4. Overview [here](https://plaid-cement-e44.notion.site/Post-Retro-Funding-4-Driving-Behavior-4952cf9a99d144759321d392e9612db4).

The goal is to raise awareness of the existence of Retro Funding for onchain builders, encouraging them to:
- sign up
- view their impact based on past rounds outcomes
- be positioned to apply to future rounds

__Raising awareness of RF is the goal so we will be taking every opportunity to celebrate the wins of each project by sharing updates to the leaderboard weekly (or when appropriate) on social media.__

### The MVP will need the following:
- [ ] Design (can use components and general feel of this other [build](https://www.figma.com/design/eVb3MoRIALsWo6AmcgfOiL/Retro-Funding-Round-4%3A-Sign-Up-%26-Application--(Public-Draft)?node-id=0-1&t=Be4LjY2TtxRvsiio-0))
- [ ] Agora API integration - to get project data (profile pic, description, etc.)
- [ ] Navigation Menu with CTA for builders to  
- [ ] View - Leaderboard (Top 10? Top 50?)
- - [ ] Ranked Projects, each project's profile picture and name, scrollable (left)
- - [ ] Chart showing impact of all projects, single overall metric (right) 
- [ ] View - Individual Projects
- - [ ] Project Details
- - [ ] Chart showing individual metrics for the project (15 or so metrics) 
- [ ] Social Media sharing integration 
- [ ] Backend for indexing and serving the metrics

### Extras (We don't need these by deadline but we will add them when we can): 
- [ ] Add timeframes filtering to leaderboard/individual project
- - [ ] Select 1 day, 1 week, 1 month, 1 year and all-time timeframes
- - [ ] Share a link that has a specific timeframe selected 
- [ ] Add metric type filtering to leaderboard
- - [ ] Select which metrics to see on the chart
- - [ ] Share a link that has a specific metrics selected

### Database setup

This project uses [MongoDB](https://www.mongodb.com/) for a database. To run the project locally, a value is needed for the `MONGODB_URI` env variable, running locally or hosted with [MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/). Your `MONGODB_URI` should be in this format:
```
mongodb+srv://USERNAME:PASSWORD@SERVER/DATABASE_NAME
```

# Built with 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
