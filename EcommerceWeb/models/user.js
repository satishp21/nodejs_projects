// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

// module.exports = User;

const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

const ObjectId = mongodb.ObjectId

class User {
  constructor(name,email){
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this) 
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findbyuserid(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id : new ObjectId(userId)})
      .next()
      .then(user => {
        console.log(user)
        return user
    })
    .catch(err => {
      console.log(err)
    });
  } 

}

module.exports = User;