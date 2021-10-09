var express = require("express");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
mongoose.Promise = Promise;

dotenv.config(); //For access to .env file

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Message = mongoose.model("Message", {
  name: String,
  message: String,
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.get("/messages/:user", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  try {
    var message = new Message(req.body);
    var savedMessage = await message.save();
    console.log("saved");
    var censored = await Message.findOne({ message: "badword" });
    if (censored) {
      await Message.remove({ _id: censored.id });
    } else io.emit("message", req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    return console.error(err);
  }

  // .catch((err) => {
  //   res.sendStatus(500);
  //   return console.error(err);
  // });
});

io.on("connection", (socket) => {
  console.log("user connection");
});

mongoose.connect(process.env.DB_CONNECT, (err) => {
  if (err) console.log("connection error..:", err);
  else console.log("connection ok");
});

http.listen(process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT} `);
});
