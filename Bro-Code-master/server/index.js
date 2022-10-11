const express = require('express');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5001;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const authRoute = require('./Routes/auth')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/auth', authRoute);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);