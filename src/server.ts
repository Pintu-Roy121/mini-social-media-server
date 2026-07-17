import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    const mongoDbUrl = envVars.DB_URL;
    if (!mongoDbUrl) {
      throw new Error("MongoDB URI not found in environment variables");
    }
    await mongoose.connect(mongoDbUrl);
    console.log("Connect to DB Successful");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is Listing on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("unhandledRejection", () => {
  console.error("Unhandled Rejection detected. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.error("Uncaught Exception detected. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
