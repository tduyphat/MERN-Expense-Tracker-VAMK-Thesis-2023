import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

await mongoose
  .connect(
    "mongodb+srv://tduyphat:Duyphat080300@cluster0.bhss4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connection is successful"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/transaction", (req, res) => {
  const { amount, description, date } = req.body;
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
