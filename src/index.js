const app = require('./app');
const main = () => {
    app.listen(app.get('port'), () => {
        console.log(`Port on ${app.get('port')}`);
    });
};

main();
