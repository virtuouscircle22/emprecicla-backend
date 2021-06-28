const mongoose = require('mongoose');

const urlBD = 'mongodb+srv://virtuouscircle:ka202_2019@cluster0-mms5n.mongodb.net/reciclaje?retryWrites=true&w=majority'

mongoose.connect(urlBD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));