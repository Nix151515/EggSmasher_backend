const mongoose = require('mongoose');

var UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
            // unique: true,
        },
        socketId: {
            type: String,
            required: false,
            minlength: 1
        },
    });
    var User = mongoose.model('User', UserSchema);
    module.exports = {User};