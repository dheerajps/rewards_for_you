const {postPayerTransaction} = require('./controllers/transactions/post');
const {getTransactions} = require('./controllers/transactions/get');
const {getPayerBalances} = require('./controllers/payers/balances/get');
const {postUserPoints} = require('./controllers/user/points/post');
const {helloWorld} = require('./controllers/helloWorld');

const Hapi = require('hapi');

const routes = [
    {method: 'POST', path: '/transactions', handler: postPayerTransaction},
    {method: 'GET', path: '/payers/balances', handler: getPayerBalances},
    {method: 'POST', path: '/user/points', handler: postUserPoints},
    {method: 'GET', path: '/transactions', handler: getTransactions}
];

module.exports.startServer = async () => {
    const server = new Hapi.Server({
        host: '0.0.0.0',
        port: 5555
    });


    server.route({
        method: 'GET',
        path: '/hello',
        handler: helloWorld
    });

    server.route(routes);

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

}