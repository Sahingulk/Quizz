const http = require('http');
const app = require('./app');
const { setupSockets } = require('./sockets');
const mongoose = require('mongoose');


const server = http.createServer(app);
setupSockets(server);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.log(err));
