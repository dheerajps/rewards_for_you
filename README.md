#### Rewards Assignment

Language: Node.js ([How to download and install node](https://nodejs.org/en/download/))

Commands: 

Use node version 14.15.0
```
nvm use 14.15.0                                                                              
```

Install all dependencies

```
yarn install
```

Start server

```
yarn start
```

We should see this message:
```
$ node index.js
Server started at http://0.0.0.0:5555
```

Routes:

1. `method: 'POST', path: '/transactions` --> To save transactions
2. `method: 'GET', path: '/transactions`  --> To retrieve saved transactions
3. `method: 'POST', path: '/user/points`  --> To spend certain points across payers
4. `method: 'GET', path: '/payers/balances` --> To fetch balances for all payers


This web service uses [HAPI](https://hapi.dev/) server framework.
