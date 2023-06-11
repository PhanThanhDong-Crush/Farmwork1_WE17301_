import express from "express";
import {
  addPro,
  getAllPro,
  getOnePro,
  getPro_Name,
  getProductsByPriceRange,
  getRelatedProducts,
  new3Pro,
  removePro,
  updatePro,
} from "../controllers/product";

const router = express.Router();

router.get("/products", getAllPro);
router.get("/products/:id", getOnePro);
router.get("/products-new", new3Pro);
router.get("/products-relate/:id", getRelatedProducts);
router.get("/products-price-range", getProductsByPriceRange);
router.post("/products-name", getPro_Name);
router.post("/products/add", addPro);
router.put("/products/edit/:id", updatePro);
router.delete("/products/:id", removePro);

export default router;
