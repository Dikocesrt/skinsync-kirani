const { History, Product, Article, SkinType } = require("../models/index");
const getURL = require("../helpers/getImage");

const detailHistory = async (req, res) => {
    const { id } = req.params;
    // const isHistory = req.
    const history = await History.findOne({ 
        include: [
            { model: SkinType, as: "skin_type" },
        ],
        where: { 
            id
        } 
    });

    const plainHistory = history.get({ plain: true });

    if(plainHistory.skin_type.image){
        plainHistory.skin_type.image = getURL(plainHistory.skin_type.image, 450, 415);
    }

    const products = await Product.findAll({
        limit: 6,
        include: [
            { model: SkinType, as: "skin_type" },
        ],
        where: { skin_type_id: history.skin_type_id } 
    });

    const plainProducts = products.map((product) => product.get({ plain: true }));

    plainProducts.forEach((product) => {
        if (product.image) {
            product.image = getURL(product.image, 250, 200);
            product.detailImage = getURL(product.image, 800, 300);
        }
    });

    const articles = await Article.findAll({
        limit: 4,
         where: { skin_type_id: history.skin_type_id } });

    const plainArticles = articles.map((article) => article.get({ plain: true }));

    plainArticles.forEach((article) => {
        if (article.image) {
            article.image = getURL(article.image, 350, 200);
        }
    });

    const createdAt = history.createdAt.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    res.render("histories/detail", { history: plainHistory, products: plainProducts, articles: plainArticles, createdAt, user: req.session.user });
};

module.exports = { detailHistory };