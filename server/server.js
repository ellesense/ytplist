const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
const connectToDatabase = require("./db");

connectToDatabase();

app.use(express.json({ extended: false }));

app.use("/users", require("./routes/api/users"));
app.use("/post", require("./routes/api/post"));
app.use("/auth", require("./routes/api/auth"));
app.use("/profile", require("./routes/api/profile"));

app.get("/", (req, res) => {
  res.send("hi?");
});

app.listen(port, () => {
  console.log(port);
});
