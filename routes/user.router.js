const express = require("express");
const User = require("../models/user.schema");
const Notification = require("../models/notification.schema");
const NotificationText = require("../models/notificationText.schema");
const NotificationType = require("../models/notificationType.schema");

const userRouter = express.Router();

userRouter.post('/newUser', async (req, res) => {
  const timeBetween = Math.floor(Math.random() * 6 + 5) * 1000;
  const duration = Math.floor(Math.random() * 4 + 1) * 1000;

  let newUser = new User({
    clickedNotifications: [],
    timeBetweenNotifications: timeBetween,
    notificationDuration: duration,
  })
  const user = await newUser.save();
  const allTexts = await NotificationText.find();
  allTexts.forEach(async (notificationText) => {
    const newNotification = new Notification({
        text: notificationText,
        clicked: false, 
        repeatingNotification: true,
        user: user
    });
    await newNotification.save();
  });
  res.send(user);
});

module.exports = userRouter;
