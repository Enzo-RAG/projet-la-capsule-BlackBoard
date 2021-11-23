var express = require('express');
var router = express.Router();

var articleModel = require('../models/articles')
var orderModel = require('../models/orders')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', async function(req, res, next) {

  var emptyStocks = await articleModel.find({stock:0})

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var messages = user.messages;
  
  var unreadMessages = 0;
  for(var i=0;i<messages.length;i++){
    if(messages[i].read == false){
      unreadMessages +=1
    }
  }

  var taches = user.tasks;
  var taskInprogress = 0

  for(var i=0;i<taches.length;i++){
    if(taches[i].dateCloture == null){
      taskInprogress +=1;
    }
  }

  res.render('index',{emptyStocks:emptyStocks.length,unreadMessages,taskInprogress});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  res.render('tasks', {taches: user.tasks});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');

  res.render('messages', {messages: user.messages});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {

  var users = await userModel.find({status: "customer"});

  res.render('users', {users});
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {

  var articles = await articleModel.find();

  res.render('catalog', {articles});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {

  var orders = await orderModel.find();
  
  res.render('orders-list', {orders});
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {

  var order = await orderModel.findById(req.query.id)
                              .populate('articles')
                              .exec()

  res.render('order', {order});
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {
  var aggregate = userModel.aggregate()

  // aggregate.group({_id: "$gender", genderCount: {$sum:1}})
  // const data = aggregate.exec()
  // let male = 0
  // let femelle = 0
  // data.forEach(gender => {
  //   if(gender._id === 'male'){
  //     male = gender.genderCount
  //   }
  // });



  aggregate.match({"gender" : "male"})
  aggregate.group({
    _id: "$gender",
    userCount:{$sum:1}
  })

  var datah = await aggregate.exec()
  console.log(datah[0].userCount)

  var aggregate = userModel.aggregate()
  aggregate.match({"gender" : "female"})
  aggregate.group({
    _id: "$gender",
    userCount:{$sum:1}
  })

  var dataf = await aggregate.exec()
  console.log(dataf[0].userCount)

  
  // var aggregate = userModel.aggregate()
  // aggregate.match({"status" : "admin"})
  // aggregate.group({
  //   _id: {
  //     inscriptionYear: {$year : '$dateExp'}}, 
  //   userCount:{$sum:1}
  // });

  // var dataR = await aggregate.exec()
  // console.log(dataR)

  var user = await userModel.findById('5c52e4efaa4beef85aad5e52');
  var r = 0
  var nr = 0
  for(var i=0;i<user.messages.length;i++){
    if(user.messages[i].read){
      r++
    }  else {
      nr++
    }}
  
  console.log(r)
  console.log(nr)

  
  var aggregate = orderModel.aggregate()
  
  aggregate.match({"status_payment" : "validated"})
  aggregate.group({_id: "$status_shipment", orderCount: {$sum : 1}});

  var dataship = await aggregate.exec()
  console.log(dataship)
  console.log(dataship[0].orderCount)




  var aggregate = orderModel.aggregate()
  
  aggregate.match({"status_payment" : "validated"})
  aggregate.group({_id:{inscriptionYear:{$year: '$date_payment'},
inscriptionMonth:{$month: '$date_payment'}
},
total :{$sum : '$total'}});

  var dataship = await aggregate.exec()
  console.log(dataship)
  console.log(dataship[0].orderCount)
 
  res.render('charts', {datah: datah ,dataf:dataf, messages: user.messages, r: r, rn: nr,dataship: dataship});
});



module.exports = router;
