const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/first_fashion', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('successfully');
    }catch(error){
        console.log('false');
    }
}
module.exports ={ connect };

