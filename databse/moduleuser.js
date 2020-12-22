const { Sequelize, DataTypes } = require('sequelize');
const conexao = require('./conection')
const sequelize = conexao;

const Usuario = sequelize.define('Usuario',{

    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    user:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{})

module.exports = Usuario;