import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ProductRouter from "./routes/product";
import ProductCategory from "./routes/category";


const app = express();

app.use( express.json() );
app.use( "/api", ProductRouter );
app.use( "/api", ProductCategory );
app.use( cors() );

mongoose.connect( `mongodb://127.0.0.1:27017/web208` );

export const viteNodeApp = app;
