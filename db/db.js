//npm init -y
//npm i sequelize mysql2
// pode ser tbm mariadb, postgres, sqlite 
//ordem dos arquivos ->
//db.js pra inicializar com sequelize
//produto/tablea(n).js pra definir as caracteristicas das tabelas 
//index.js pra de fato manipular as coisas

// # Set architecture flags
// export ARCHFLAGS="-arch x86_64"
// # Ensure user-installed binaries take precedence

//The following possible Homebrew files were not deleted:
/*
/usr/local/Frameworks/
/usr/local/Homebrew/
/usr/local/bin/
/usr/local/etc/
/usr/local/include/
/usr/local/lib/
/usr/local/opt/
/usr/local/sbin/
/usr/local/share/
/usr/local/var/
*/
// export PATH=/usr/local/mysql/bin:$PATH

//senha do acesso root = calacref11!
//senha 2 root  Lfl-OZ=210bk


// # Load .bashrc if it exists
// test -f ~/.bashrc && source ~/.bashrc

const Sequelize = require('sequelize')
const sequelize = new Sequelize("crud", 'root', "calacref11!", {
    dialect : 'mysql',
    host : 'localhost',
    port : 3306
})

module.exports = sequelize;