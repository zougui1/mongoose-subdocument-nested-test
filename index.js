const mongoose = require('mongoose');

// define a connection string to a mongoDB database
const mongoURI = '';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB starting'))
  .catch(err => {
    console.error(`MongoDB error ${err}`);
    process.exit(1);
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//mongoose.set('debug', true);


// creations of models

const test1Schema = mongoose.Schema({
  something: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test2'
  }
});

const Test1 = mongoose.model('Test1', test1Schema);

const test2Schema = mongoose.Schema({
  name: String
});

const Test2 = mongoose.model('Test2', test2Schema);

const name = 'name';

// create documents in the DB
// uncomment if your database is empty
/*(async () => {

  const test2 = await new Test2({
    name: name
  }).save();

  const test1 = await new Test1({
    something: test2._id,
  }).save();
})();*/

// queries
// won't retrieve any document from Test1
(async () => {
  const test1 = await Test1.findOne({ 'something.name': name }).populate('something');
  console.log('1 query:', test1);
})();

// will retrieve one document from Test1
(async () => {
  const test2 = await Test2.findOne({ name: name });
  const test1 = await Test1.findOne({ something: test2._id }).populate('something');
  console.log('2 queries:', test1);
})();
