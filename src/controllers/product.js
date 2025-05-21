const { Product, SkinType } = require("../models/index");
const getURL = require("../helpers/getImage");
const { Op } = require("sequelize");

const listProduct = async (req, res) => {
    try {
        const { search, skinType } = req.query;

        const whereClause = {};
        const includeClause = [];

        // Filter berdasarkan nama produk
        if (search) {
            whereClause.name = {
                [Op.like]: `%${search}%`
            };
        }

        // Filter berdasarkan nama jenis kulit
        if (skinType) {
            includeClause.push({
                model: SkinType,
                as: "skin_type", // pastikan sesuai alias di relasi
                where: {
                    name: skinType
                }
            });
        } else {
            includeClause.push({
                model: SkinType,
                as: "skin_type"
            });
        }

        const products = await Product.findAll({
            where: whereClause,
            include: includeClause,
            order: [["createdAt", "DESC"]],
        });

        const plainProducts = products.map((product) => product.get({ plain: true }));

        plainProducts.forEach((product) => {
            if (product.image) {
                product.image = getURL(product.image, 330, 325);
            }
        });

        const micellarWaterProducts = plainProducts.filter((product) => product.category === "micellar water");
        const faceWashProducts = plainProducts.filter((product) => product.category === "face wash");
        const tonerProducts = plainProducts.filter((product) => product.category === "toner");
        const serumProducts = plainProducts.filter((product) => product.category === "serum");
        const moisturizerProducts = plainProducts.filter((product) => product.category === "moisturizer");
        const sunscreenProducts = plainProducts.filter((product) => product.category === "sunscreen");

        res.render("products/list", {
            micellarWaterProducts,
            faceWashProducts,
            tonerProducts,
            serumProducts,
            moisturizerProducts,
            sunscreenProducts,
            isProduct: true,
            search,
            skinType
        });
    } catch (error) {
        console.error("LIST PRODUCT ERROR =>", error);
    }
};

module.exports = { listProduct };