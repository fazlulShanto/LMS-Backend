const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_uuid: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String
    },

    student_id: {
        type: String
    }
    ,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    roles: {
        type: Object,
        default: {
            "User": 10000
        }
    },
    courses: {
        type: Array,
        default: []
    },
    refresh_token: {
        type: String
    },
    access_token: {
        type: String
    }
});




module.exports = mongoose.model('User', userSchema);