// const process = require('process')
const Sequelize = require('sequelize')
const sequelize = new Sequelize("crud", 'root', "calacref11!", {
    dialect : 'mysql',
    host : 'localhost',
    port : 3306,
    dialectModule: require('mysql2')
})

module.exports = sequelize;

//npm init -y
//npm i sequelize mysql2
// pode ser tbm mariadb, postgres, sqlite 
//ordem dos arquivos ->
//db.js pra inicializar com sequelize
//produto/tablea(n).js pra definir as caracteristicas das tabelas 
//index.js pra de fato manipular as coisas