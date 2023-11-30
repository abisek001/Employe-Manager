const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

const Routes = require('./Routes/Employee.js')
const userRouter = require('./Routes/user.js')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

const crosOption = {
    origin: ["http://localhost/3000"],
    credentials: true,
    optionSuccessStatus: 200
}

dotenv.config();
app.use(cors(crosOption))
app.use(bodyParser.json());
app.use('/employee', Routes)
app.use('/user', userRouter)

const hostname = process.env.hostname;
const port = process.env.port;
const atlasURL = process.env.atlasURL;
mongoose.connect(atlasURL)
.then( res => {
app.listen(port, hostname, () => {
console.log(`Server is runnung on http://${hostname}:${port}`);
})
}).catch(error => console.log(error))

