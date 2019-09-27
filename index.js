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
  test2: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test2'
    }],
    default: []
  },
  test3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test3'
  }
});

const Test1 = mongoose.model('Test1', test1Schema);

const test2Schema = mongoose.Schema({
  name: String
});

const Test2 = mongoose.model('Test2', test2Schema);

const test3Schema = mongoose.Schema({
  name: String
});

const Test3 = mongoose.model('Test3', test3Schema);

const test2Name = 'my super name';
const test3Name = 'another name';

// create documents in the DB
// uncomment if your database is empty
/*(async () => {

  const test2 = await new Test2({
    name: test2Name
  }).save();

  const test3 = await new Test3({
    name: test3Name
  }).save();

  const test1 = await new Test1({
    test2: [test2._id],
    test3: test3._id,
  }).save();
})();*/

// queries
(async () => {
  const test1s = await Test1.findOne({ 'test3.name': test3Name }).populate('test3');
  console.log(test1s);
})();
