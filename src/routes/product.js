import express from "express";
import { getAll } from "../controllers/product";

const router = express.Router();

router.get("/products", getAll);

export default router;
