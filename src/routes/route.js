const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const frontController = require("../controllers/front");
const articleController = require("../controllers/article");

router.get("/", frontController.showFront);
router.get("/login", authController.showLogin);
router.post("/login", authController.login);
router.get("/register", authController.showRegister);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/articles", articleController.listArticle);

module.exports = router;