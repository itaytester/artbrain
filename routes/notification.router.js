const express = require("express");
const path = require("path");
const {getColors} = require('theme-colors');
const textCheck = require("../utils/textChecker");
const mongoose = require("mongoose");
const NotificationText = require("../models/notificationText.schema");
const NotificationType = require("../models/notificationType.schema");
const Notification = require("../models/notification.schema");

const notificationRouter = express.Router();
notificationRouter


.get('/types', async (req, res) => {
    const response = await NotificationType.find();
    res.send(response);
})
.get('/texts', async (req, res) => {
    const response = await NotificationType.find().populate('type');
    res.send(response);
})
.post('/type', async (req, res) => {
    const { color, name} = req.body;
    const theme = getColors(color);
    const colorPalette = {
        light: theme[200],
        primary: theme[500],
        dark: theme[700]
    }
    const file = req.files.file;
    const imageId = new mongoose.Types.ObjectId();
    await file.mv(path.join(__dirname, `../images/${imageId.toString()}.png`));
    const newType = new NotificationType({img: imageId.toString(), color: colorPalette, name});
    const doc = await newType.save();
    res.send(doc);
})
.post('/text', async (req, res) => {
    const {text, type} = req.body;
    const alteredText = textCheck(text);
    const newText = new NotificationText({text: alteredText, type});
    const doc = await newText.save();
    res.send(doc);
})
.post('/notificationClicked/:id', async (req, res) => {
    const id = req.params.id;
    const response = await Notification.updateOne({_id: id},{$set: {clicked: true}});
    res.send(response);
})
.get('/image/:id', function (req, res) {
    const id = req.params.id;
    res.sendFile(path.join(__dirname, `../images/${id}.png`));
});

module.exports = notificationRouter;
