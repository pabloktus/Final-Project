const { Router } = require("express");
const router = Router();

const { Product, Ask, Answer, Discount, Category, Specification, ProductInventory, SubCategory } = require("../db");



const productInfo = async function (id) {

    const getProduct = await Product.findOne({
        where: {
            id
        },
        include: [
        {
            model: ProductInventory,
            attributes: ["quantity"],
        },
        {
            model: Discount,
            attributes: ["name", "description", "discountPercent", "active"],
            through: {
                attributes: [],
            }
        },
        {
            model: Category,
            attributes: ["id", "name", "description", "thumbnail"],
            through: {
              attributes: [],
            },
            include: {
              model: SubCategory,
              attributes: ["id", "name", "description", "thumbnail"],
              through: {
                attributes: [],
              },
            },
          },
          {
            model: Specification,
            attributes: ["id", "name"],
            through: {
                as:"value:",
                attributes: ["value"],
            },
        },
        {
            model: Ask,
            attributes: ["content"],
            include: [
                {
                    model: Answer,
                    attributes: ["content"]
                }
            ]
        }]
    })


    let temp = [];
    temp.push(getProduct)
    

    return temp;
}


router.get("/:productId", async (req, res, next) => {

    const { productId, categoryId } = req.params


    try {
        if (productId) {
            const productFound = await productInfo(productId, categoryId)

            return res.status(200).send(productFound)
        }
    } catch (error) {
        next("Product not found")
    }
})


module.exports = router;