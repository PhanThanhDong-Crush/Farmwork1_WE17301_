import { ProductSchema } from "../Schema/product";
import Product from "../models/product";

export const getAllPro = async function ( req, res )
{
  const {
    _sort = "createAt",
    _order = "asc",
    _limit = 10,
    _page = 1,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [ _sort ]: _order == "desc" ? -1 : 1,
    },
  };

  try
  {
    const { docs, totalDocs, totalPages } = await Product.paginate( {}, options );
    if ( docs.length === 0 )
    {
      return res.status( 400 ).json( { message: "Không có sản phẩm nào" } );
    }
    return res.status( 200 ).json( { data: docs, totalDocs, totalPages } );
  } catch ( error )
  {
    return res.json( {
      message: error.message,
    } );
  }
};

export const getOnePro = async function ( req, res )
{
  try
  {
    const data = await Product.findOne( { _id: req.params.id } );
    if ( !data )
    {
      return res.status( 400 ).json( { message: "Không có sản phẩm nào" } );
    }
    return res.json( data );
  } catch ( error )
  {
    return res.json( {
      message: error.message,
    } );
  }
};

export const addPro = async ( req, res ) =>
{
  try
  {
    const { error } = ProductSchema.validate( req.body );
    if ( error )
    {
      return res.status( 400 ).json( {
        message: error.details[ 0 ].message,
      } );
    }
    const product = await Product.create( req.body );
    if ( !product )
    {
      return res.json( {
        message: "Không thêm sản phẩm",
      } );
    }

    return res.json( {
      message: "Thêm sản phẩm thành công",
      data: product,
    } );
  } catch ( error )
  {
    return res.status( 400 ).json( {
      message: error,
    } );
  }
}

