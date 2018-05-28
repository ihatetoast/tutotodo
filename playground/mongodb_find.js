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
  //   .find({
  //     _id: new ObjectID('5b0b56d12b4a3a25226f3163')
  //   })
  //   .toArray()
  //   .then(
  //     docs => {
  //       console.log('Tutorials');
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     err => {
  //       console.log('unable to fetch tutorials', err);
  //     }
  //   );
  // db
  //   .collection('Tutorials')
  //   .find()
  //   .count()
  //   .then(
  //     count => {
  //       console.log(`Tutorials count: ${count}`);
  //     },
  //     err => {
  //       console.log('unable to fetch tutorials', err);
  //     }
  //   );

  db
    .collection('Users')
    .find({ name: 'Fabian Cassidy' })
    .toArray()
    .then(
      docs => {
        console.log('Docs with name of Fabian');
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log('unable to find faby', err);
      }
    );
  // client.close();
});
