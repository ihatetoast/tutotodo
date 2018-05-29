// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');
//_id: new ObjectID('5b0b56d12b4a3a25226f3163')

MongoClient.connect('mongodb://localhost:27017/tutotodo', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TutotodosApp');
  // delete many
  // db
  //   .collection('Tutorials')
  //   .deleteMany({
  //     title: 'The Complete Node.js Developer Course (2nd Edition)'
  //   })
  //   .then(result => {
  //     console.log(result);
  //   });
  db
    .collection('Users')
    .deleteMany({ name: 'Fabian Cassidy' })
    .then(result => {
      console.log(result);
    });
  db
    .collection('Users')
    .findOneAndDelete({ _id: new ObjectID('5b0b518edb4915bddc6bcd7c') })
    .then(result => {
      console.log(JSON.stringify(result, undefined, 2));
    });
  //delete one will delete the first one that matches the criteria
  // db
  //   .collection('Tutorials')
  //   .deleteOne({ author: 'Cam Hamm' })
  //   .then(result => {
  //     console.log(result);
  //   });

  //find one and delete
  // db
  //   .collection('Tutorials')
  //   .findOneAndDelete({ _id: new ObjectID('5b0c91544aeebdba876cbf92') })
  //   .then(result => {
  //     console.log(JSON.stringify(result, undefined, 2);
  //   });
  // client.close();
});
