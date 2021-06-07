const {startServer} = require('./src/server');

(async () => {
    try {
        await startServer();
    } catch (error) {
        console.log( `error starting server`, error );
    }
})();
