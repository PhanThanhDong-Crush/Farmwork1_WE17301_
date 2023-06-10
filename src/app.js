import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRouter from "./routes/product";
import ProductCategory from "./routes/category";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200", // Cung cấp nguồn (origin) của ứng dụng Angular
  })
);
app.use("/api", ProductRouter);
app.use("/api", ProductCategory);

mongoose.connect(`mongodb://127.0.0.1:27017/web208`);

export const viteNodeApp = app;
