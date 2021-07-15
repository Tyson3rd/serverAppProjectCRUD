const { Sequelize } = require('sequelize'); 
//Q: Why is this Sequelize capitalized?
//A: this is a Class reference

const path = require('path'); //a node native module

//Q: What are we creating down below?
//A: Creating the database, sets the type as sqlite and sets the storage location.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'), //quick way to get the path for our db
});

//Q: Why are we exporting lowercase sequelize?
//A: because we area exporting the created database reference
module.exports = {sequelize};
