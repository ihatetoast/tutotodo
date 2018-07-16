// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

//args: db where the todos live,, that silly obj option, then a callback fcn       err    db obj
MongoClient.connect(
  'mongodb://localhost:27017/tutotodo',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      //return prevents the rest of the fcn from running

      return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    const db = client.db('tutotodo')
    db.collection('tutorials').insertOne({
      title: 'ES6 for Everyone',
      completed: false,
      tutor: 'Wes Bos',
      keywords: ['ES6', 'JavaScript']
    }, (err, result) => {
      if (err) {
        return console.log("Oops. Couldn't enter tutorial", err);
      }
      //pretty
      console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    })
    client.close();
  }
);
