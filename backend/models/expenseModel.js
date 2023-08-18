const {Sequelize} = require('sequelize')

const sequelize = require('../config/dbconfig')

const expense = sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
        
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
       
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    } 
})

module.exports = expense;