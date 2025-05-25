const { Article } = require("../models/index")
const getURL = require("../helpers/getImage")

const listArticle = async (req, res) => {
    try {
        const articles = await Article.findAll({
            order: [["createdAt", "DESC"]],
        })

        const plainArticles = articles.map((article) => article.get({ plain: true }))

        plainArticles.map((article) => {
            if(article.image) {
                article.image = getURL(article.image, 350, 200)
            }
        })

        res.render("articles/list", { articles: plainArticles, isArticle: true, user: req.session.user })
    } catch (error) {
        console.log("LIST ARTICLES ERROR => " + error)
    }
}

module.exports = { listArticle }