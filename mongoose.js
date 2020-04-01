var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    // process.env.MONGODB_URI ,
    // 'mongodb+srv://nicolaestate:iiMDLpBxvC3GIIL3@encore-ww9m6.gcp.mongodb.net/test?retryWrites=true&w=majority',
    // 'mongodb://test:test123@ds137404.mlab.com:37404/piky',
    'mongodb://localhost:27017/Egg',
    // 'mongodb+srv://parageo:mysterydb123!@pw-cinema-87nhm.gcp.mongodb.net/pw-cinema-db?retryWrites=true',
{ useNewUrlParser: true });

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connection.db.dropDatabase();

module.exports = mongoose;