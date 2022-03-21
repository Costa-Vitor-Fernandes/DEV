const express = require("express")
const app = express();
const mysql = require("mysql")
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "calacref11!",
    database: "new_schema",
    port: "3306"
    //aqui a porta que ta o meu server mysql
})


const port = 3001
app.listen(port, () =>{
    console.log('rodando servidor')
})