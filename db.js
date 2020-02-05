const dotenv = require('dotenv')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

dotenv.config()

const dbConfig = require('./config/db.config.js')

module.exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
        .then(() => console.log('Connected to the database...'))
        .catch(err => {
            console.error('Could not connect to the database!')
            console.error(err)
            process.exit()
        })
}