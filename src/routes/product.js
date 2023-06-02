import express from "express";
import { get, getAll } from "../controllers/product";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);

export default router;
