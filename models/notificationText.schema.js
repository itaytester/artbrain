const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const NotificationTextSchema = new Schema({
    type: {type: mongoose.Schema.Types.ObjectId , ref:'NotificationType'},
    text: String
});

// Model
const NotificationText = mongoose.model('NotificationText', NotificationTextSchema);

module.exports = NotificationText;