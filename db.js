const dotenv = require('dotenv')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

dotenv.config()

module.exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log('Connected to the database...'))
        .catch(err => {
            console.error('Could not connect to the database!')
            console.error(err)
            process.exit()
        })
}