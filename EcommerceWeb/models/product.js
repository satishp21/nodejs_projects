// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class Product {
  constructor(title,price,description,imageUrl,id,userId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // update existing product
      dbOp = db.collection('products').updateOne({_id :this._id}, {$set :this})
    }
    else{
      //create new product
      dbOp = db.collection('products').insertOne(this)
    }
    
    return dbOp
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products)
        return products
    })
    .catch(err => {
      console.log(err)
    });
  } 

  static findByPk(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({_id : new mongodb.ObjectId(prodId)})
      .next()
      .then(product => {
        console.log(product)
        return product
    })
    .catch(err => {
      console.log(err)
    });
  } 

  static deletebyid(prodId) {
    console.log(prodId)
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({_id : new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log("deleted")
      })
      .catch(err => {
        console.log(err)
      });
  } 

  
  

}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
