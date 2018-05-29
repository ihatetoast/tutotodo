// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');
//_id: new ObjectID('5b0b56d12b4a3a25226f3163')

MongoClient.connect('mongodb://localhost:27017/tutotodo', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TutotodosApp');

  // db
  //   .collection('Tutorials')
  //   .findOneAndUpdate(
  //     { _id: new ObjectID('5b0c98064aeebdba876cc17e') },
  //     { $set: { completed: true } },
  //     { returnOriginal: false }
  //   )
  //   .then(results => {
  //     console.log(results);
  //   });
  db
    .collection('Users')
    .findOneAndUpdate(
      { _id: new ObjectID('5b0b4e0dcc6c2bbb5fc6e2b2') },
      {
        $set: { name: 'Katy Cassidy' },
        $inc: { age: 1 }
      },
      { returnOriginal: false }
    )
    .then(results => {
      console.log(results);
    });

  // client.close();
});
