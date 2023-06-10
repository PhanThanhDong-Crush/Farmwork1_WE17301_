import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    description: String,
    dateAdded: String, //ngày nhập
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Products", productSchema);
