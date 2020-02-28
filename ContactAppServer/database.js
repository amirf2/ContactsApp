const dotenv = require('dotenv');
dotenv.config();
const DB_URL = process.env.DB_URL || 'localhost'
const DB_NAME = process.env.DB_NAME || 'contact_app_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '123213';


const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD, {dialect: 'mysql',  logging: false});
const mysql = require('mysql2');
const Contacts = defineContact();


function createDB(){
    //console.log(process.env)
    const con = mysql.createConnection({
        host: DB_URL,
        user: DB_USER,
        password: DB_PASSWORD
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("CREATE DATABASE IF NOT EXISTS contact_app_db", function (err, result) {
            if (err) throw err;
            console.log("Database created");
            defineContact();
            syncSequelize();
        });
    });
}


function defineContact(){
    return sequelize.define('contacts',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: Sequelize.STRING(30),
            phone: Sequelize.STRING(15),
            title: Sequelize.STRING(10),
            avatar:Sequelize.STRING(50),
            createdAt: {
                field: 'created_at',
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            },
            updatedAt: {
                field: 'updated_at',
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                allowNull: false
            },
        }, 
        {timestamps: true}
    );
}


function syncSequelize(){
    sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully")
    })
    .catch(err => {
        console.log(`Unable to connecto the the DB: ${err}`)
    })
    sequelize.sync({
       //force: true
    })
    .then(() => {
        console.log("Connection to DB established successfully");
    })
    .catch(err => {
        console.log(`Couldn't connect to DB, error: ${err}`);
    })  
}


module.exports = {
    createDB,
    Contacts : Contacts
}