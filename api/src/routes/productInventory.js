const { Router } = require("express");
const router = Router();

const { Product, ProductInventory } = require("../db");

router.post("/", async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.query;

  try {
    const addQuantity = await ProductInventory.create({
      quantity,
    });

    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    addQuantity.setProduct(productId);

    res.status(200).send(addQuantity);
  } catch (error) {
    next(error);
  }
});



router.get("/", async (req, res, next) => {

  const {productId} = req.query

  try{
   if(productId){
    const getStockOne = await ProductInventory.findOne({
      where: {
        productId
      },
      include: [
        {
          model: Product,
          attributes: ["name"]
        }
      ]
    })

    const info = {
      name: getStockOne.product.name,
      productId: getStockOne.productId,
      quantity: getStockOne.quantity,
      createdAt: getStockOne.createdAt,
      updatedAt: getStockOne.updatedAt
    }

   
    return res.status(200).send(info)

   } else {
    const getAllInventory = await ProductInventory.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"]
        }
      ]
    });

    const mapped = getAllInventory.map(e => {
      return {
        name: e.product.name,
        productId: e.productId,
        quantity: e.quantity,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt
      }
    })

    return res.status(200).send(mapped)
   }

  } catch(error){
    res.send(error)
  }
  
})

module.exports = router;
