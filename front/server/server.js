const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const authData = require('./data/auth');
const searchData = require('./data/search');

/**
 * Login api
 */
server.post('/api/login', (req, res, next) => {
    const data = req.body;
    console.log(req.body);
    const user = {
        email: 'hesron@live.fr',
        password: 'password'
    };
    if (data.email == user.email && data.password == user.password) {
        res.status(200).send(authData.login);
    } else {
        res.status(401).send(authData.loginError);
    }
});

/**
 * Search api
 */
server.get('/api/search/categories', (req, res, next) => {
    res.status(200).send(searchData.getCategories);
});

server.listen(3000, () => {
    console.log('JSON server listening on port 3000');
});