import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/TransactionsApi.js";
import AuthApi from "./routes/AuthApi.js";
import connect from "./database/mongodb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/transaction", TransactionsApi);
app.use("/auth", AuthApi);

await connect();

app.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
