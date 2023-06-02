import joi from "joi";

export const ProductSchema = joi.object( {
  name: joi.string().required(),
  image: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  description: joi.string().required(),
  dateAdded: joi.string().required(),
  categoryId: joi.string().required(),
} );
