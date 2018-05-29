// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/tutotodo', (error, client) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TutotodosApp');
  db.collection('Tutorials').insertOne(
    {
      title: 'CSS Grid',
      author: 'Wes Bos',
      source: 'https://cssgrid.io/',
      keywords: ['CSS', 'grid', 'layout'],
      body: 'Twenty-five videos and four hours to understand the new CSS Grid.',
      completed: false
    },
    (error, result) => {
      if (error) {
        return console.log('unable to insert tutorial.', error);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );

  //insert new doc into the Users: name, age, location string
  // db.collection('Users').insertOne(
  //   {
  //     name: 'The George Cassidy',
  //     age: 4,
  //     location: 'Austin, TX'
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert user.');
  //     }
  //     console.log(result.ops[0]._id.getTimestamp());
  //   }
  // );

  client.close();
});
