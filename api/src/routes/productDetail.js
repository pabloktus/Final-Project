const { Router } = require("express");
const router = Router();

<<<<<<< HEAD
const { Product, Ask, Answer, Discount, Category, Specification, ProductInventory, SubCategory, Image, User, ShoppingCart } = require("../db");


=======
const {
  Product,
  Ask,
  Answer,
  Discount,
  Category,
  Specification,
  ProductInventory,
  SubCategory,
  Image,
  User,
  Review,
} = require("../db");
>>>>>>> 38a80488d16ea67dea699b1580af9b6ac44193ab

const productInfo = async function (id) {
  const getProduct = await Product.findOne({
    where: {
      id,
    },
    include: [
      {
        model: ProductInventory,
        attributes: ["quantity"],
      },
      {
        model: Discount,
        attributes: ["id", "name", "description", "discountPercent", "active"],
        through: {
          attributes: [],
        },
      },
      {
        model: Category,
        attributes: ["id", "name", "description", "thumbnail"],
        through: {
          attributes: [],
        },
      },
      {
        model: SubCategory,
        attributes: ["id", "name", "description", "thumbnail"],
        through: {
          attributes: [],
        },
        include: [
          {
            model: Category,
            attributes: ["id", "name", "description", "thumbnail"],
            through: {
              attributes: [],
            },
          },
        ],
      },
      {
        model: Specification,
        attributes: ["id", "name"],
        through: {
          attributes: ["value"],
        },
      },
      {
        model: Ask,
        attributes: ["id", "content", "createdAt"],
        include: [
          {
            model: Answer,
            attributes: ["id", "content", "createdAt"],
            include: [
              {
                model: User,
                attributes: ["id", "userName"],
              },
            ],
          },
          {
            model: User,
            attributes: ["id", "userName"],
          },
        ],
      },
      {
        model: Image,
        through: {
          attributes: [],
        },
      },
     /*  {
        model: Review,
        through: {
          attributes: [],
        },
      }, */
    ],
  });

  let temp = [];
  temp.push(getProduct);

  return temp;
};

router.get("/:productId", async (req, res, next) => {
  const { productId, categoryId } = req.params;

  try {
    if (productId) {
      const productFound = await productInfo(productId, categoryId);

      return res.status(200).send(productFound);
    }
  } catch (error) {
    next("Product not found");
  }
});

module.exports = router;
