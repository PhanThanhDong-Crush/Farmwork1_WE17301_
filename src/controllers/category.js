import Category from "../models/category";
import product from "../models/product";
export const getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        // Nếu mảng không có sản phẩm nào thì trả về 404
        if (categories.length === 0) {
            res.status(404).json({
                message: "Không có danh mục nào",
            });
        }
        // Nếu có sản phẩm thì trả về 200 và mảng sản phẩm
        return res.status(200).json(categories);
    } catch (error) {
        // Nếu có lỗi thì trả về 500 và lỗi
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate("products")
        if (!category) {
            return res.status(404).json({
                message: "Không có danh mục nào",
            });
        }
        const products = await product.find({ categoryId: category._id });

        if (category) {
            category.products = products
        }

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
        });
    }
};
export const create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        if (!category) {
            return res.status(400).json({
                message: "Không thể tạo danh mucj",
            });
        }
        return res.status(201).json({
            message: "category created",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Tìm danh mục dựa trên categoryId
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục",
            });
        }

        if (category.name === "Other") {
            // Nếu đang xóa danh mục "Other", kiểm tra xem có sản phẩm nào trong danh mục "Other" hay không
            const otherCategory = await Category.findOne({ name: "Other" });

            const productsInOtherCategory = await product.find({
                categoryId: otherCategory._id,
            });

            if (productsInOtherCategory.length === 0) {
                // Nếu không có sản phẩm nào trong danh mục "Other", xóa danh mục "Other"
                await Category.findByIdAndDelete(otherCategory._id);

                return res.status(200).json({
                    message: "Danh mục Other đã được xóa thành công",
                    category,
                });
            } else {
                // Nếu có sản phẩm trong danh mục "Other", cập nhật categoryId của các sản phẩm sang danh mục "Other" mới
                const newCategory = await Category.create({ name: "Other" });

                await product.updateMany(
                    { categoryId },
                    { categoryId: newCategory._id }
                );
            }
        } else {
            // Nếu đang xóa một danh mục khác, cập nhật categoryId của các sản phẩm sang danh mục "Other"
            const otherCategory = await Category.findOne({ name: "Other" });

            if (!otherCategory) {
                // Nếu danh mục "Other" không tồn tại, tạo mới danh mục "Other" và cập nhật categoryId của các sản phẩm sang danh mục "Other" mới
                const newCategory = await Category.create({ name: "Other" });

                await product.updateMany(
                    { categoryId },
                    { categoryId: newCategory._id }
                );
            } else {
                // Nếu danh mục "Other" đã tồn tại, cập nhật categoryId của các sản phẩm sang danh mục "Other" hiện tại
                await product.updateMany(
                    { categoryId },
                    { categoryId: otherCategory._id }
                );
            }
        }

        // Xóa danh mục hiện tại
        await Category.findByIdAndDelete(categoryId);

        return res.status(200).json({
            message: "Danh mục đã được xóa thành công",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};



export const update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Sản phẩm đã được cập nhật thành công",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
