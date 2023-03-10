# Bichonomy Test Repository

### Usecase
Deploy a smart contract using Bichonomy Smart Account.

### Error

<img width="1440" alt="Screenshot 2023-03-03 at 2 20 48 PM" src="https://user-images.githubusercontent.com/47684949/222675147-1bf0b4d8-57f6-43b5-a22d-ff6f118f4705.png">

The libary needs a "to" param for any transaction. But for contract deployment, there is no "to" field as it should be null.
The script runs if I use ethersJS contract Factory to deploy and it has no issues with it.

I checked your lib code and then had found this condition which is triggering this condition.
File - node_modules/@biconomy/account-abstraction/dist/src/ERC4337EthersSigner.js Line -166
It is triggered internally when we call sendGaslessTransaction.

<img width="1440" alt="Screenshot 2023-03-03 at 2 25 27 PM" src="https://user-images.githubusercontent.com/47684949/222676254-81bfcc0e-4413-4ca1-8486-e377c1fc822f.png">

A repository for reproducing the issue for deploying new contracts from Bichonomy Smart Account


- Install dependencies

```
yarn
```

- Compile Test Smart Contract

```
yarn run compile
```

Add a .env file in root and copy the contents for .env.example. You will need a Private Key with some goerli ETH to run the script. (It doee not do a trasnaction as the error is before it). The script just uses the private key to init the smart account.

- Run the Script

```
yarn run test
```

