const mongodb = require('mongodb')
const mongoclient = mongodb.MongoClient

let db;

const mongoConnect = (callback) => {
  mongoclient.connect('mongodb+srv://piyushgsuthar7:rcIQ1VckLbkGQxgV@cluster0.i4sz3ut.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    console.log('connected')
    db = client.db()
    callback(client)
  })
  .catch(err => {
    console.log(err)
    throw err
  })
}

const getDb = () => {
  if (db) {
    return db
  }
  throw 'No Database Found'
}



exports.mongoConnect = mongoConnect
exports.getDb = getDb

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-proj', 'root', 'S@tishpa2001', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;
