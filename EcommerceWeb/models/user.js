const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

class User {
  constructor(username,email,cart,id){
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
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

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items]

    if (cartProductIndex >=0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity
    }
    else{
        updatedCartItems.push({productId : new ObjectId(product._id), quantity:newQuantity })
    }
    const updatedCart = { items: updatedCartItems }

    const db = getDb() 
    return db.collection('users').updateOne({_id : new ObjectId(this._id)}, {$set: {cart : updatedCart}})
  }

  deleteItemFromCart(productId) {
    // const cartProductIndex = this.cart.items.findIndex(cp => {
    //     return cp.productId.toString() === product._id.toString()
    // })
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    })

    const db = getDb() 
    return db.collection('users').updateOne({_id : new ObjectId(this._id)}, {$set: {cart : {items:updatedCartItems}}})
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i =>{
      return i.productId
    })
    return db.collection('products').find({_id : {$in : productIds}}).toArray().then(products => {
      return products.map(p => {
        return {...p, quantity:this.cart.items.find(i => {
          return i.productId.toString() === p._id.toString();
        }).quantity}
      })
    })
  }

  addOrder() {
    const orders = [...this.cart.items]
    const db = getDb()  
    //return db.collection('orders').insertOne(this.cart)
    return db.collection('orders').updateOne({_id : '645f48f5ea07447c6af1272d'}, {$set: {_items :orders}})
    .then(result => {
      this.cart = {items:[]}
      return db.collection('users').updateOne({_id : new ObjectId(this._id)}, {$set: {cart : {items:[]}}})
    }).catch(err => {
      console.log(err)
    })
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id : new ObjectId(userId)})
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