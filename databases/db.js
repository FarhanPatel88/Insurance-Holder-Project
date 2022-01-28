const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let uri = 'mongodb://localhost:27017/insurance_holders';
// let uri = 'mongodb+srv://farhan:9004788819@grabpolicyesd.4h0uj.mongodb.net/grabpolicyesd?retryWrites=true&w=majority'

if (process.env.NODE_ENV === 'production') {
    uri = process.env.MONGODB_URI;
}

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        uri,
        {
            // useNewUrlParser: true,
            useUnifiedTopology: true,
            // useMongoClient: true
            // dbName: 'insurance_holders',
        },
        () => console.log('Mongoose is connected')
    );
} catch (e) {
    console.log('Could not connect');
}

mongoose.connection.on('connected', () => {
    console.log('==================');
    console.log('==================');
    console.log(`Mongoose connected to ${uri}`);
    console.log('==================');
    console.log('==================');
});

mongoose.connection.once('open', () => console.log('Connected to DB!'));

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

const shutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    shutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    shutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    shutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./customers');
require('./policies');
