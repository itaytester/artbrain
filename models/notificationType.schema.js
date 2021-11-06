const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const NotificationTypeSchema = new Schema({
    name: String,
    img: String,
    color: {
        light: String,
        primary: String,
        dark: String
    }
});

// Model
const NotificationType = mongoose.model('NotificationType', NotificationTypeSchema);

module.exports = NotificationType;