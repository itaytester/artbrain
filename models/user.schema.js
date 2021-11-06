const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    clickedNotifications: [String],
    notificationDuration: Number,
    timeBetweenNotifications: Number
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;