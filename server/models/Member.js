const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    member_id: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    create_date: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
}, {
    collection: 'Member'
});

module.exports = mongoose.model('Member', MemberSchema);