import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: String,
    products: [{ type: mongoose.Types.ObjectId, ref: "Products" }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Categories", categorySchema);
