const { MongoClient, ObjectID } = require('mongodb');
//db is the tutotodo
//collection is tutorials

MongoClient.connect('mongodb://localhost:27017/tutotodo', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('tutotodo');
  // db
  //   .collection('tutorials')
  //   .find({ _id: new ObjectID('5b4bd217d2b7937fc985a7a8') })
  //   // .find()
  //   .toArray()//returns a promise
  //   .then(
  //     docs => {
  //       console.log('found by id');
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     err => {
  //       console.log('unable to find by id', err);
  //     }
  //   );
  db
    .collection('tutorials')
    .find({ tutor: 'Wes Bos' })
    // .find()
    .count()//returns a promise
    .then(
      count => {
        console.log(`Tutorials by Wes Bos: ${count}`);
      },
      err => {
        console.log('unable to find jack doody', err);
      }
    );
  // client.close();
});
