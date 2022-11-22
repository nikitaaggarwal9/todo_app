// 1. require the library
const mongoose = require('mongoose');


// 2. connect to the database
mongoose.connect('mongodb://localhost/task_list_db')


// 3. acquire the connection (to check if it is succesful)
const db = mongoose.connection;


// 4. error
db.on('error', console.error.bind(console, 'error connecting to db'));


// 5. up and running then print the message
db.once('open', function() {
    console.log('Successfully connected to the database');
});