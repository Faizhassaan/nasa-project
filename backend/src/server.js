const http = require('http');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model')

const PORT = 3000;

const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send("I am Testing")
})

async function startServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log('server is running on port:', PORT)
    })
}

startServer();