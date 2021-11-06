const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://itaytester:Aa123456@cluster0.9inzn.mongodb.net/Notifications?retryWrites=true&w=majority";
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: { origin: "*" } } });
const userRouter = require("./routes/user.router");
const notificationRouter = require("./routes/notification.router");
const User = require("./models/user.schema");
const Notification = require("./models/notification.schema");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected To Mongo Cluster!");
});

app
  .use(
    express.urlencoded({
      extended: true,
    })
  )
  .use(cors())
  .use(express.json())
  .use(fileUpload())
  .use("/User", userRouter)
  .use("/Notification", notificationRouter)
  .get("/", async (req, res) => {
    res.send("hello from api");
  });

server.listen(process.env.PORT || 8080, () => {
  console.log(`server has started on ${process.env.PORT || 8080}`);
});

io.on("connection", (socket) => {
  socket.on("start", async (userId) => {
    const user = await User.findById(userId);
    setInterval(async () => {
      const notifications = await Notification.find({
        user: userId,
        clicked: false,
      })
        .populate("user")
        .populate({
          path: "text",
          populate: { path: "type"},
        });
      const index = Math.floor(Math.random() * notifications.length);
      const notification = notifications[index];
      socket.emit("notification", notification);
    }, user.timeBetweenNotifications);
  });
});
