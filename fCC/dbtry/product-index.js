
var email = document.getElementById("email").value
(async function submitEmail (){
    
    const database = require("./db");
    const ListaEmail = require("./email-table-list");
    await database.sync();


    const novoEmail = await ListaEmail.create({
        email : email,
        descricao: 'product.html',
    })
    
})();


