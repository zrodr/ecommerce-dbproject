const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    item_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
}, {
    collection: 'Item'
});

module.exports = mongoose.model('Item', ItemSchema);