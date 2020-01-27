const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const dbConfig = require('./config/db.config.js')

module.exports.connect = () => {
    mongoose.connect(dbConfig.uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to the database...'))
        
        .catch(err => {
            console.error('Could not connect to the database!')
            console.error(err)
            process.exit()
        })
}