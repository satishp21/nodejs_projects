const Item = require('../models/user');

exports.getItems = (req,res,next) => {
Item.findAll()
  .then((items) =>{
    res.json(items);
  })
  .catch(err => {console.log(err)})
}

exports.addItem = (req,res,next) => {
    const ItemName = req.body.ItemName;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Quantity = req.body.Quantity 
    // console.log(userName,email);
    Item.create({
        ItemName: ItemName,
        Description: Description,
        Price: Price,
        Quantity:Quantity
    })
    .then(result => {
        // console.log(result);
        res.redirect('/');
    })
    .catch(err => { console.log(err) });
}

exports.deleteItem = (req,res,next) => {
    const itemId = req.body.itemId;
    console.log(itemId);
    Item.findByPk(itemId)
    .then(item => {
        return item.destroy();
    })
    .then(result => {
        console.log('DELETED ITEM');
        res.redirect('/');
      })
    .catch(err => { console.log(err) });
}

exports.reducequntity1 = (req,res,next) => {
  const itemId = req.body.itemId;
  console.log(itemId);
  Item.findByPk(itemId)
  .then(item => {
    item.update(
      {
      Quantity: item.Quantity = item.Quantity-1
      }
    )
    // item.Quantity = item.Quantity-1;
    console.log(item.Quantity)
  })
  .then(result => {
      console.log('reduced 1 ITEM');
      res.redirect('/');
    })
  .catch(err => { console.log(err) });
}

exports.reducequntity2 = (req,res,next) => {
  const itemId = req.body.itemId;
  console.log(itemId);
  Item.findByPk(itemId)
  .then(item => {
    item.update(
      {
      Quantity: item.Quantity = item.Quantity-2
      }
    )
    // item.Quantity = item.Quantity-1;
    console.log(item.Quantity)
  })
  .then(result => {
      console.log('reduced 1 ITEM');
      res.redirect('/');
    })
  .catch(err => { console.log(err) });
}