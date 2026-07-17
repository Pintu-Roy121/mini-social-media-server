import cors from "cors";
import express from "express";
import { globalErrorHandlers } from "./app/middlewares/globalErrorHandelers";
import { notFound } from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(401).json({ message: "Welcome to New Social media !!" });
});

app.use(globalErrorHandlers);
app.use(notFound);

export default app;
