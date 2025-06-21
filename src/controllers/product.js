const { Product, SkinType } = require("../models/index");
const getURL = require("../helpers/getImage");
const { Op } = require("sequelize");
const { marked } = require("marked");

function markRecommended(products) {
    const recommendMap = {};
    products.forEach(product => {
        const skinTypeId = product.skin_type_id;
        if (
            !recommendMap[skinTypeId] ||
            (product.recommend_point || 0) > (recommendMap[skinTypeId].recommend_point || 0)
        ) {
            recommendMap[skinTypeId] = product;
        }
    });
    products.forEach(product => {
        product.isRecommend = recommendMap[product.skin_type_id] && recommendMap[product.skin_type_id].id === product.id;
    });
}

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
                product.image = getURL(product.image, 250, 200);
                product.detailImage = getURL(product.image, 800, 300);
            }
            product.ingredient = marked.parse(product.ingredient);
        });

        const micellarWaterProducts = plainProducts.filter((product) => product.category === "micellar water");
        const faceWashProducts = plainProducts.filter((product) => product.category === "face wash");
        const tonerProducts = plainProducts.filter((product) => product.category === "toner");
        const serumProducts = plainProducts.filter((product) => product.category === "serum");
        const moisturizerProducts = plainProducts.filter((product) => product.category === "moisturizer");
        const sunscreenProducts = plainProducts.filter((product) => product.category === "sunscreen");

        markRecommended(micellarWaterProducts);
        markRecommended(faceWashProducts);
        markRecommended(tonerProducts);
        markRecommended(serumProducts);
        markRecommended(moisturizerProducts);
        markRecommended(sunscreenProducts);

        res.render("products/list", {
            products: plainProducts,
            micellarWaterProducts,
            faceWashProducts,
            tonerProducts,
            serumProducts,
            moisturizerProducts,
            sunscreenProducts,
            isProduct: true,
            search,
            skinType,
            user: req.session.user
        });
    } catch (error) {
        console.error("LIST PRODUCT ERROR =>", error);
    }
};

module.exports = { listProduct };