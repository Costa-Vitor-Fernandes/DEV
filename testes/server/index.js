require('dotenv').config()
const express = require("express")
const app = express();
const mysql = require("mysql2")
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        
function verifyJWT(req, res, next){ 
    var token = req.body.token

    if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) { 
        if (err) 
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        next(); 
    }); 
}    
        

// trocar nome do cliente = trocar de numero de mesa
// exportar ser um modal coringa, que define varias opções de exportação



//==============================================================================================================================
// POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST POST 

//registering
app.post('/create', async (req,res)=>{
    
    const password =  req.body.password
    const username = req.body.username
    const email = req.body.email    
    // console.log("trying to create user in database")
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
  }   
    catch{
        res.status(500).send('deu ruim')
    }
})

//login plus jwt
app.post('/login', async (req, res)=>{
    console.log('login')
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
            if(compare){
            const id = result.map(r=>r.id)
            const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 43200 // expires in 12h
            });
            return res.json({ auth: true, token: token})
        }
          res.status(500).json({message: 'Login inválido!'})
        })
    }
    catch{
        res.status(500).send('deu ruim 500')
    }

})



//cadastro de produtos
app.post('/addProduct', verifyJWT, (req, res)=>{
    try{
        const nome = req.body.nome
        const preco = req.body.preco
        // console.log(username, nome, preco)
        // console.log(`${username}pode adicionar o produto${nome}`);
    res.status(201).send("adicionando no banco")
    console.log()
    const insert = db.query(`INSERT INTO new_schema.products (nomeproduto, preco) VALUES ('${nome}', '${preco}')`)
    return insert
}
    catch{
        res.status(500)
    }
})

// add a order
app.post("/addToComanda", function (req,res){
    const nomeproduto = req.body.nomeproduto
    const quantidade = req.body.quantidade
    const cliente = req.body.cliente


    //NOVA QUERY
//   INSERT INTO new_schema.comanda (nomeproduto, quantidade, cliente, preco) VALUES (`guarana`,1,`Vitor`, (SELECT preco FROM new_schema.products WHERE nomeproduto=`guarana`))

// INSERT INTO new_schema.comanda (nomeproduto, quantidade, cliente, preco) VALUES ('guarana',1,'Vitor', (SELECT preco FROM new_schema.products WHERE nomeproduto='guarana'))


    db.query(`INSERT INTO new_schema.comanda (nomeproduto, quantidade, cliente, preco) VALUES ('${nomeproduto}','${quantidade}','${cliente}', (SELECT preco FROM new_schema.products WHERE nomeproduto='${nomeproduto}'))`)
    res.send("checar se adicionou em get")
})

app.post("/encerrarComanda", function (req,res){
   const cliente = req.body.cliente
   const pagamento =  req.body.pagamento 
   const id = req.body.id

   db.query(`UPDATE new_schema.comanda SET status="1", pagamento="${pagamento}" WHERE idpedido=${id}`)
   res.send(`comanda do cliente ${cliente} foi paga com ${pagamento}`)

})
app.post('/updateQuantidade', function(req,res){
    const quantidade = req.body.quantidade
    const id = req.body.id

 db.query(`UPDATE new_schema.comanda SET quantidade=${quantidade} WHERE idpedido=${id}`)
res.send(`pedido de id numero ${id} foi alterado`)
})

app.post("/editarPrecoProduto", verifyJWT, function(req,res){
    const nomeproduto= req.body.nomeproduto
    const novoPreço = req.body.preco
    db.query(`UPDATE new_schema.products SET preco="${novoPreço}" WHERE nomeproduto="${nomeproduto}" `)
})

// ==============================================================================================================================
// GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET GET 

// read all products
app.get("/allProducts", (req,res)=>{
    db.query("SELECT * FROM new_schema.products", function (err,result,fields){
    console.log(result.map(r=>r.nomeproduto))
    console.log(result.map(r=>r.preco))
    //res send both maps    
    })
})


app.get("/todosClientesAbertos", (req,res)=>{
    db.query("SELECT * FROM new_schema.comanda WHERE status='0' ", function(err,result,fields){
        // res.json cada cliente
        const obj =  result.map(r=>r.cliente)
        //separa por unico 
        const cadaCliente = [...new Set(obj)]
        console.log(cadaCliente)
        res.json(cadaCliente)

    })
})


// gets all orders
app.get("/todasComandas", (req,res)=>{
    db.query("SELECT * FROM new_schema.comanda", function (err,result,fields){
        console.log(result.map(r=>r.idpedido))
        console.log(result.map(r=>r.nomeproduto))
        console.log(result.map(r=>r.quantidade))
        console.log(result.map(r=>r.cliente))
        console.log(result.map(r=>r.preco))
    })
})
app.get("/todasComandasAbertas", (req,res)=>{
    db.query("SELECT * FROM new_schema.comanda WHERE status='0'", function (err,result,fields){
        console.log(result.map(r=>r.idpedido))
        console.log(result.map(r=>r.nomeproduto))
        console.log(result.map(r=>r.quantidade))
        console.log(result.map(r=>r.cliente))
        console.log(result.map(r=>r.preco))
        const obj = {
            id: result.map(r=>r.idpedido),
            nomeproduto: result.map(r=>r.nomeproduto),
            quantidade: result.map(r=>r.quantidade),
            cliente: result.map(r=>r.cliente),
            preco:result.map(r=>r.preco)   
        }
        res.json(obj)
    })
})

// get all orders from 1 customer
// adicionar verifyJWT como middleware depois
// req.query to axios.get("") {params: {params}}
app.get("/comandaCliente", (req,res)=>{
    const cliente = req.query.cliente
    // req.query.cliente pro axios...
    console.log(cliente)

    
    // talvez eu deva implementar aqui o status = 0 pra nao pagas e fazer
    // outra rota so pra pagos
    db.query(`SELECT * FROM new_schema.comanda WHERE cliente="${cliente}" AND status=0 `, function (err,result,fields){
        console.log(result.map(r=>r.idpedido))
        console.log(result.map(r=>r.nomeproduto))
        console.log(result.map(r=>r.preco))
        console.log(result.map(r=>r.quantidade))
        const obj ={
            id: result.map(r=>r.idpedido),
            nomeproduto: result.map(r=>r.nomeproduto),
            quantidade: result.map(r=>r.quantidade),
            preco:result.map(r=>r.preco)
        }
        res.json(obj)
        // retornar os ids dos pedidos com res send json 
    })

})


//===========================================================================================================================
// DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE 


//delete cadastro de produto
app.delete("/deleteProduct", verifyJWT, (req,res) =>{
//db query delete product where req.body.product
const produto =  req.body.nomeproduto
db.query(`DELETE FROM new_schema.products WHERE nomeproduto='${produto}'`)
res.send("checa produtos se deu certo")
})

//delete pedido errado
app.delete("/deletePedido", verifyJWT, (req,res)=>{
    const idpedido = req.body.idpedido
    db.query(`DELETE FROM new_schema.comanda WHERE idpedido='${idpedido}'`)
    console.log('check')
    res.send('pedido excluido')
})

//deleta a comanda em aberto
app.delete('/comandaFechada', verifyJWT, (req,res)=>{
    const cliente = req.body.cliente
    db.query(`DELETE FROM new_schema.comanda WHERE cliente="${cliente}"`)
})


//===========================================================================================================================
//  TESTING SECTION TESTING SECTION TESTING SECTION TESTING SECTION TESTING SECTION TESTING SECTION TESTING SECTION 


//all users
app.get('/', (req, res) => {
    console.log('all users from database')
    db.query('SELECT * FROM new_schema.users', function (err, result, fields) {
        if (err) throw new Error(err)
        const allUsers = result.map((r)=> r.username )
        console.log(allUsers)
    })
    // res.send(`${JSON.stringify(users)}`)
})

//test if username already exists
app.post('/tester', async (req,res)=>{
    const username = req.body.username
    db.query('SELECT * FROM new_schema.users' , async function (err, result, fields) {
        //  if (err) throw new Error(err)
    const allUsers = result.map((r)=> r.username)
        if(await allUsers.includes(username)) return res.send("ja tem esse usuário")
    })

})


//logout do luiz tools
app.post('/logout', function(req, res) {
    // blacklist de tokens?
    // res.json({ auth: false, token: null });
    
})


// DEFAULT LISTEN PORT

const port = 3001
app.listen(port, () =>{
    console.log('rodando servidor')
})




