const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const frontController = require("../controllers/front");
const articleController = require("../controllers/article");
const productController = require("../controllers/product");

router.get("/", frontController.showFront);
router.get("/login", authController.showLogin);
router.post("/login", authController.login);
router.get("/register", authController.showRegister);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/articles", articleController.listArticle);
router.get("/products", productController.listProduct);

module.exports = router;