const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; //mongoClient constructor

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://shubhammaske:Shubh099@cluster0.xcvdj4q.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    console.log('connected')
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
  });
}

const getDb = ()=> {
  if(_db){
    return _db;
  }

  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
