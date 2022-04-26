const express = require("express")
const app = express();
const mysql = require("mysql")
const cors = require('cors')
const bcrypt = require('bcrypt');



app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "calacref11",
    database: "new_schema",
    port: "3306"
    //aqui a porta que ta o meu server mysql
})

const users = []

app.post('/create', async (req,res)=>{
    try{
        const password =  req.body.password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {username: req.body.username, password: hashedPassword};
        users.push(user)
        console.warn(JSON.stringify(user))    
        res.status(201).send()
    }
    catch{
        res.status(500).send('deu ruim')
    }
})
app.post('/login', async (req, res)=>{
    const user =  users.find(user => user.username === req.body.username)
    // console.log(user)
    if(!user){
        return res.status(400).send("Esse usuário não existe")
    }
    try{

        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("logou com sucesso")
        }
        
    }
    catch{
        
        res.status(500).send('deu ruim 500')
    }

})


app.get('/', (req, res) => {
    console.log('all users')
    res.send(`${JSON.stringify(users)}`)
})

const port = 3001
app.listen(port, () =>{
    console.log('rodando servidor')
})