const mongoose = require('mongoose');
const Category = require('./_data/models/Category');


let categories = [];

mongoose.connect('<Insert db url>', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});


const seed = async () => {

}