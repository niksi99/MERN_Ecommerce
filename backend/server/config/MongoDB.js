const mongoose = require('mongoose')

const url = process.env.MONGODB_URL;

const MongoDB_Connect = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Radi mongo'))
      .catch((error) => console.log(error))
}

module.exports = MongoDB_Connect;