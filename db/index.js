(async () =>{

    const database = require('./db');
    const Produto = require("./produto");
    await database.sync();

    const novoProduto1 = await Produto.create({
        nome: 'Teclado Usb',
        preco: 30,
        descricao: 'Teclado maneiro',
    })
    const novoProduto2 = await Produto.create({
        nome: 'Teclado gamer',
        preco: 1000,
        descricao: 'Teclado com muitas luzes',
    })
console.log(novoProduto1)

const showAllProdutos = await Produto.findAll()
console.log(showAllProdutos)

// const showPkProdutos = await Produto.findByPk()
})();