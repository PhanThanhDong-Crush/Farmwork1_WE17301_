import { ProductSchema } from "../schemas/product";
import Product from "../models/product";

export const getAllPro = async function (req, res) {
  const {
    _sort = "price",
    _order = "asc",
    _limit = 6,
    _page = 1,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };

  try {
    const { docs, totalDocs, totalPages } = await Product.paginate({}, options);
    if (docs.length === 0) {
      return res.status(400).json({ message: "Không có sản phẩm nào" });
    }
    console.log({ data: docs, totalDocs, totalPages });
    return res.status(200).json({ data: docs, totalDocs, totalPages });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getOnePro = async function (req, res) {
  try {
    const data = await Product.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({ message: "Không có sản phẩm nào" });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const addPro = async (req, res) => {
  try {
    const { error } = ProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: "Không thêm sản phẩm",
      });
    }

    return res.json({
      message: "Thêm sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const updatePro = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Sản phẩm được cập nhật thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const removePro = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Sản phẩm đã được xóa thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const new3Pro = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .exec();

    return res.json({
      message: "3 sản phẩm mới nhất",
      data: products,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getPro_Name = async function (req, res) {
  try {
    const data = await Product.find({
      name: { $regex: req.body.name, $options: "i" },
    });
    // $regex và $options để thực hiện tìm kiếm không phân biệt chữ hoa / chữ thườngv(case -insensitive) và tìm các từ có giống hoặc gần giống với từ khóa.

    if (!data) {
      return res.status(400).json({ message: "Không có sản phẩm nào" });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Không có sản phẩm nào" });
    }

    const relatedProducts = await Product.find({
      categoryId: data.categoryId,
      _id: { $ne: data._id },
    });

    return res.json(relatedProducts);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
