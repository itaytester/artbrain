const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    text: {type: mongoose.Schema.Types.ObjectId , ref:'NotificationText'},
    clicked: Boolean,
    repeatingNotification: Boolean,
    user: {type: mongoose.Schema.Types.ObjectId , ref:'User'},
});

// Model
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;