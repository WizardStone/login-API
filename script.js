const express = require('express');
const server = express();

let PORT = process.env.PORT || 3000;

server.use((req, res, next) => {
    console.log(`IP:${req.ip} ${req.method} request for ${req.url}`);
    next();
});


server.get('/', (req, res) => {
    res.status(404).send('Invalid - Cannot GET /');
});

server.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});


// 404 / 403 Endpoints

server.use((req, res, next) => {
    if (req.url == '/403'){
        res.status(403).send('Forbidden - You do not have permission to access this resource.');
        console.warn(`User accessed a 403 page (IP: ${req.ip}) and endpoint ${req.url}.`);
        console.error('403 Error: Forbidden access attempt detected.');
    }
    next();
});

server.use((req, res, next) => {
    if (!(req.url == '/403')){

        res.send(404).status(404);
        console.warn(`User accessed a 404 page (IP: ${req.ip}) and endpoint ${req.url}.`)
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
