require("dotenv").config();
const http = require("http");
const app = require("./app");
const { connectDB } = require("./db");

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const main = async () => {
  try {
    await connectDB();
    server.listen(port, "0.0.0.0", async () => {
      console.log(`Server is running in port: ${port}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();
