require('dotenv').config()
const express = require("express")
const app = express();
const mysql = require("mysql")
const cors = require('cors')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
// console.log(process.env.SECRET)

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

app.post('/tester', async (req,res)=>{
    const username = req.body.username
    db.query('SELECT * FROM new_schema.users' , async function (err, result, fields) {
        //  if (err) throw new Error(err)
    const allUsers = result.map((r)=> r.username)
        if(await allUsers.includes(username)) return res.send("ja tem esse usuário")
    })

})

app.post('/create', async (req,res)=>{
    
    const password =  req.body.password
    const username = req.body.username
    const email = req.body.email    
    console.log("trying to create user in database")
try{

    db.query('SELECT * FROM new_schema.users' , async function (err, result, fields) {
        //  if (err) throw new Error(err)
        const allUsers = result.map((r)=> r.username)
        const allEmails = result.map((r)=> r.email)
        if(allUsers.includes(username.toString()) || allEmails.includes(email)) return res.send("esse jatem")
        if(!allUsers.includes(username) || !allEmails.includes(email)){
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(`creates user ${username}`)

            res.send('deu bom')
            const insert = db.query(`INSERT INTO new_schema.users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`)
            return insert
        }
            

    })

    //     db.query(`INSERT INTO new_schema.users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`)
            




   
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(`creates user${username}`)
        // db.query(`INSERT INTO new_schema.users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`)
  }   
    

    // try{
    //     const password =  req.body.password
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const user = {username: req.body.username, password: hashedPassword};
    //     users.push(user)
    //     console.warn(JSON.stringify(user))    
    //     res.status(201).send()
    // }
    catch{
        res.status(500).send('deu ruim')
    }
})


app.post('/login', async (req, res)=>{

    const password =  req.body.password
    const username = req.body.username
    const email = req.body.email
    const hashedPassword = ""

    try{
        const queryval = `SELECT * FROM new_schema.users WHERE username="${username}"` 
        db.query(queryval, async function (err, result, fields) {
            if (err) throw new Error(err)
            const resultPassword = result.map((r)=>r.password)
            const compare = await bcrypt.compare(password.toString(), resultPassword.toString()) 
            console.log(compare)
            if(compare){
                // return res.send("logou com sucesso")
                
                //da um jwt?
            
                
                // if(req.body.user === 'luiz' && req.body.password === '123'){
                //     //auth ok
            const id = result.map(r=>r.id)
            const token = jwt.sign({id}, process.env.SECRET, {
              expiresIn: 43200 // expires in 12h
            });
            return res.json({ auth: true, token: token });
        }
          res.status(500).json({message: 'Login inválido!'});

       
        })
    }
    catch{
        res.status(500).send('deu ruim 500')
    }

})


//logout do luiz tools
app.post('/logout', function(req, res) {
    // res.json({ auth: false, token: null });
})
app.get('/', (req, res) => {
    console.log('all users from database')
    db.query('SELECT * FROM new_schema.users', function (err, result, fields) {
        if (err) throw new Error(err)
        
        const allUsers = result.map((r)=> r.username )

        

        console.log(allUsers)
    })
    
    
    // res.send(`${JSON.stringify(users)}`)
})
const port = 3001
app.listen(port, () =>{
    console.log('rodando servidor')
})