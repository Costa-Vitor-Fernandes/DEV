const Sequelize = require('sequelize')
const database = require('./db')
                                    //nome da tabela no WB
const ListaEmail = database.define('Lista', {
    id:{
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey: true

    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false

    },
    descricao: Sequelize.STRING
})

module.exports = ListaEmail;

