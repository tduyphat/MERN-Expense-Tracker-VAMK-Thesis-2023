import mongoose from "mongoose";

async function connect() {
  await mongoose
    .connect(
      "mongodb+srv://tduyphat:Duyphat080300@cluster0.bhss4.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("MongoDB connection is successful"));
}

export default connect;
